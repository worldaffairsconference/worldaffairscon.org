# worldaffairs.ucc.on.ca
🌎Brand new React project for the worldaffairs.ucc.on.ca website!!
## ⌛ It's time to move forward: Embracing Client Side Rendering
Some limitations to the old WAC website:
* non component-based design make it difficult to refactor code
* requiring re-render on every interaction
* non-dynamic content managing
* hard to manage dependancies and versions
* mistakes and bugs are hard to spot
* inconsistant code formatting  
The list goes on. Overall, it's been a hassle to maintain and update.  
Due to COVID-19, `WAC 2021: Together Towards Tomorrow` was the first ever virtual WAC and many technological inconviniences prompted @JeffersonDing to re-create the WAC website, effectively moving `Towards Tomorrow`
### Major Changes and Benifits
- Enforced formating and code consistancy
- A smoother UX
- More delicate and modular components
- High future expandability
- Easy integration with backend framworks and cloud computation
## Stack
### Tech
- The react project is based on `Node.js` which is mainly `Javascript` using the `React` frontend framework.  
- To ensure code consistancy, included in the repository are `.eslintrc.js` and `.prettierrc.js` which uses `eslint` and `prettier`.    
- Following the footsteps of the original WAC website, this project uses `Bootstrap v5.0.0` and `Fontawesome v4.7.0` as frontend components.  
- Due to the transitoin to `Node.js` and `React` we are able to interact with the `DOM` much easier thus removing the use of `jQuery`. 
### Other Details
- An updated version of the custom `style.css` is located in `/public/assets/style/style.css` and handles all the custom styling, removing all inline `CSS`  
- Continue to use the `Nexa` font located in `/pubic/assets/style/webfonts/`  
- `yarn` or `npm` as package manager

## Usage
### Installation and Launch
1. Clone the repository
2. Make sure that you have `Node.js` and `npm` or `yarn` installed
3. Run `npm install` or `yarn intsall` on the directory
4. Run `npm start` or `yarn start` on the directory
### Modifications
1. All pages of the website is located `/src/pages/` directory as individual `.js` files. Files may contain multiple `React Components` but only one is exported as the page.  
2. `Header` and `Footer` and other reusable components are located in `/src/components/`
3. All user images are uploaded to `/src/img/`
4. Dynamic data could be managed under `/src/data/`. 
5. Primary `Router` is located at `/src/index.js`
6. Primary `Router Switch` is located at `/src/app.js`
#### Dynamic Data
One of the major benifits of React is its dynamic aspect.  
- To modify the home page quotes, change `quotes.json`
- To modify routes to plenaries and specific plenary informations, modify `plenary.js` 
- To modify FAQ, edit `FAQ.js`
- To modify Schedule or Recording of the conference, modify `schedule.js`
- To modify staff/ambassadors list and roles, modify `staff.js`
