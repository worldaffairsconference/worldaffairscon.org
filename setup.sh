#!/bin/bash

# Dependency locations and variables
JQUERY=https://code.jquery.com/jquery-3.2.1.min.js
TETHER=https://raw.githubusercontent.com/HubSpot/tether/master/dist/js/tether.min.js
FA_VER=5.0.1
FONTAWESOME=https://use.fontawesome.com/releases/v$FA_VER/fontawesome-free-$FA_VER.zip
BS_VER=4.0.0-beta
BOOTSTRAP=https://codeload.github.com/twbs/bootstrap/zip/v$BS_VER

# Check to see if the user has all the tools
hash bundle 2>/dev/null || { echo >&2 "Bundler not installed please install with \` gem install bundler\`"; }

# Make curl if it doesn't exist
hash curl 2>/dev/null || { echo >&2 "curl not installed, building it from wget"; alias curl="wget -q -O - $1"; }

# Helper functions
# This just curls and unzips the file
uncurl() {
	echo " . Downloading $2 from $1"
	curl -s $1 > temp.zip
	echo " . Unpacking $2"
	unzip -q temp.zip
	rm temp.zip
}
# This makes a folder and cd's into it
mkcd() {
	mkdir $1
	cd $1
}

# Actual installation
cd ${0%/*} # Go to this directory
echo "   Starting install"

# RubyGems
echo " - Starting RubyGems"
bundle install
echo " √ RubyGems done!"

# All independent Javascript
echo " - Starting Javascript"
cd js
curl -s $JQUERY > jquery.min.js
curl -s $TETHER > tether.min.js
cd ..
echo " √ Javascript done!"

# FontAwesome 5
echo " - Starting FontAwesome"
uncurl $FONTAWESOME FontAwesome
mv fontawesome-free-$FA_VER fa-archive
mv fa-archive/svg-with-js/js/fontawesome-all.min.js js/
rm -r fa-archive
echo " √ FontAwesome done!"

# Bootstrap
echo " - Starting Bootstrap"
uncurl $BOOTSTRAP Bootstrap
mv bootstrap-$BS_VER bs-archive
mv bs-archive/scss css/bootstrap
mv bs-archive/dist/js/bootstrap.min.js js/
rm -r bs-archive
echo " √ Bootstrap done!"

# Build the resulting website (this is redundant but is useful for time efficiency)
echo " - Building site"
sass css/bootstrap/bootstrap.scss --style compressed > css/bootstrap.min.css # Sass -> CSS
jekyll build
echo " √ Build complete!"
