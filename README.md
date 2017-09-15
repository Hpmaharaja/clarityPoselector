# Clarity Position Selector Component
This repository is temporarily created for a Google maps implementation on a React Component.

## Description
This project is for a google maps implementation and user interaction for picking locations.

## Additional Sources Utilized
```
  https://github.com/tomchentw/react-google-maps
  https://tomchentw.github.io/react-google-maps/#googlemap
  https://developers.google.com/maps/documentation/javascript/reference#LatLngBounds
```

## How to run project
```
git clone [Repository]
cd clarityPoselector
npm install
npm start
VISIT localhost:8080 TO INTERACT WITH APPLICATION
```

## The Stack and Dependencies
### React-Native Dependencies and Dev-Dependencies
```
"dependencies": {
    "google-map-react": "^0.24.0",
    "google-maps-react": "^1.1.0",
    "react": "^15.6.1",
    "react-dom": "^15.6.1",
    "react-google-maps": "^7.2.0"
  },
  "devDependencies": {
    "babel-core": "*",
    "babel-loader": "^7.1.2",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-2": "^6.24.1",
    "css-loader": "^0.28.7",
    "style-loader": "^0.18.2",
    "webpack": "^3.5.6",
    "webpack-dev-server": "^2.7.1"
  }

```

The most important third-party asset utilized for this project was the react-google-maps. This enabled easy interaction with Google Maps API and displaying the necessary marker for the starting and pickec locations.

## Project structure 
The structure of the application and all its files are the following:
```javascript
src
 ├── package.json //contains the start scripts and dependencies
 │
 ├── webpack.config.js //allows for proper compilation of React JSX and specifies build config
 │
 ├── dist // utilized as the output folder
 │
 └── src
 	 ├── index.html // entry point for the frontend application
 	 │
     └── app // React-focused app folder
         │── Components  // React Components
     	 │	  └── Poselector.js // Clarity Position Selector Component
    	 └── index.js // entry point for the selecting the right injection point in index.html
 
```
This project structure is based on feature organization. 