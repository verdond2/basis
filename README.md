# gulp-build-system
This is the gulp build system setup used for the majority of projects.

##Installation

To get started with the system you must ensure that you have gulp and jshint installed globally. If not you can install them by calling the following in your terminal:

```
npm install -g gulp jshint
```

The next step is to clone this repo into your desired project folder.

```
git clone https://github.com/MurrayCreative/gulp-build-system.git
```

Once the files have been successfully pulled down, run the follwing to install dependenices:

```
npm install
```

##Cusomization

The gulpfile contains a series of variables which can be modified to change various aspects of your build. Change the following to suit your project needs.

```
var baseUrl = 'https://good-insurance:8890/'; // Local MAMP Development URL for BrowserSync. Change as-needed. 
	// var baseDir = './app'; // Browsersync server base directory when not using proxy url above
	var showScssLint = false; // turn scsslint on or off
	var showJsHint = false; // turn JShint on or off
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





