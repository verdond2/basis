
# Basis [![Alt DevDependencies](https://david-dm.org/verdond2/basis/dev-status.svg)](https://david-dm.org/verdond2/basis/) 
This is a basic setup for a project. The setup includes an assets folder structure, gulp build system and bower for managing packages.

## Installation

To get started you must ensure that you have **gulp** and **jshint** installed globally. If not you can install them by calling the following in your terminal:

```
npm install -g gulp jshint bower
```

The next step is to download a tar of the repo for use in your project. Place these files in whatever desired folder you like. Note this command below will place the files into the current directory.

```
curl -L https://github.com/verdond2/basis/archive/master.tar.gz | tar zx --strip 1 
```

Once the files have been successfully pulled down, run the following to install dependenices:

```
npm install
```

## File Structure

This gulp setup is based on the below folder structure. 

```
├── assets
│	├── dist
	│   ├── css
	│   ├── fonts
	│   ├── images
	│   └── js
│	└── src
	    ├── bower_components
	    ├── css
	    ├── images
	    ├── js
	    ├── scss
	    └── svg-sprites
gulpfile.js
package.json
bower.json
.bowerrc
index.html
```

## Customization

The gulpfile contains a series of variables which can be modified to change various aspects of your build. 

```
var baseUrl = '<%= proxy_url %>'; // Local MAMP Development URL for BrowserSync. Change as-needed. 
// var baseDir = './'; // Browsersync server base directory when not using proxy url above
var showScssLint = false; // turn scsslint on or off
var showJsHint = true; // turn JShint on or off
var spritesPrefix = "icon-";

/*  Style paths
    ========================================================================== */

var styleSRC = 'assets/src/scss/**/*.scss'; // Path to main .scss file
var styleDist = 'assets/dist/css/'; // Path to place the compiled CSS file
var styleWatchFiles = 'assets/src/scss/**/*.scss'; // Path to all *.scss files inside css folders

/*  JS paths
    ========================================================================== */

var jsSRC = 'assets/src/js/main.js'; // Path to main js file
var jsDist = 'assets/dist/js/'; // Path to place the compiled js file
var jsWatchFiles = 'assets/src/js/**/*.js'; // Path to all js files inside src folder

/*  Images and SVG paths
    ========================================================================== */

var imgSRC = 'assets/src/images/**';
var imgDist = 'assets/dist/images/';
var svgSRC = 'assets/src/svg-sprites/**';

```

### To proxy or not to proxy

The setup is designed to allow you to use a proxy. For example, if you have setup the project in something like MAMP and the site actually has a dedicated host name e.g (website:8888), then remember to change is the **baseUrl** with your hostname.

However, if you are not using a hostname and have no need for a proxy. The gulp setup can just be run from your project folder. The **baseDir** can be changed to whatever you require e.g **(./app)**. By default the directory setup is disabled. To enable this, go to the browserSync function and uncomment the line below and comment out the line referencing the **proxy: baseUrl**.

```
// server: true,
// server: {
//  baseDir: baseDir
// },
// port: 3000,
proxy: baseUrl,
```


## Run 

Once you have made any sort of modifications to the variables. Please ensure you change the name & description in the package.json file.
Just run the following and you will be good to go!

```
gulp
```

## Contributing

To contribute to this setup, you can clone the repo using the command below. 

```
git clone https://github.com/verdond2/basis.git
```

Please ensure to create a branch (feature, hotfix, bugfix) and when you are finished please submit a pull request for review. Any issues that you notice while using this repo, please submit them through the [issue tracker](https://github.com/verdond2/basis/issues)


