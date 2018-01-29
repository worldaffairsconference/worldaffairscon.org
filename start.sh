#!/bin/bash

# A small script to "compile" all the work for the website
cd ${0%/*} # Go to this directory
sass css/bootstrap/bootstrap.scss --style compressed > css/bootstrap.min.css # Sass -> CSS
bundle exec jekyll serve
