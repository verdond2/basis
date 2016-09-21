/*  ==========================================================================
    1. Setup Path Varaibles
    ========================================================================== */

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


/*  ==========================================================================
    2. Requires
    ========================================================================== */

	var gulp = require('gulp'),
		// JS related plugins.
		uglify = require('gulp-uglify'),
		jshint = require('gulp-jshint'),
		include = require("gulp-include"),
		// CSS related plugins.
		sass = require('gulp-sass'),
		scsslint = require('gulp-scss-lint'),
		scssLintStylish = require('gulp-scss-lint-stylish'),
		sourcemaps = require('gulp-sourcemaps'),
		autoprefixer = require('gulp-autoprefixer'),
		cleanCSS = require('gulp-clean-css'),
		// Utility related plugins.
		path = require('path'),
		imagemin = require('gulp-imagemin'),
		svgstore = require('gulp-svgstore'),
		svgmin = require('gulp-svgmin'),
		gulpif = require('gulp-if'),
		plumber = require('gulp-plumber'),
		rename = require("gulp-rename"),
		notify = require("gulp-notify"),
		gutil = require('gulp-util'),
		cache = require('gulp-cache'),
		browserSync = require('browser-sync').create();

/*  ==========================================================================
    Styles
    ========================================================================== */

	gulp.task('styles', function () {
		return gulp.src('assets/src/scss/**/*.scss')
			.pipe(plumber({ errorHandler: reportError }))
			.pipe(gulpif(showScssLint, scsslint({ customReport: scssLintStylish })))
			.pipe(sourcemaps.init()) // generate sourcemaps
			.pipe(sass()) // start sass process
			.pipe(autoprefixer({ browsers: ['last 3 versions'] }))
			.pipe(gulp.dest(styleDist)) // copy *.css into destination
			.pipe(cleanCSS()) // clean and minify *.css
			.pipe(rename({ extname: '.min.css' })) // rename *.css to *.min.css
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(styleDist)) // copy *.min.css to destination
			.pipe(notify({ title: "Styles Task", message: "Styles compiled successfully.", onLast: true }))
			.pipe(browserSync.stream());
	});

/*  ==========================================================================
    Scripts
    ========================================================================== */

	gulp.task("scripts", function() {
		return gulp.src(jsSRC)
			.pipe(plumber({ errorHandler: reportError }))
			.pipe(include())
			.pipe(gulpif(showJsHint, jshint()))
			.pipe(gulpif(showJsHint, jshint.reporter('jshint-stylish')))
			.pipe(uglify())
			.pipe(rename({ suffix: '.min' }))
			.pipe(gulp.dest(jsDist))
			.pipe(notify({ title: "Scripts Task", message: "Scripts compiled successfully.", onLast: true }));
	});

	// create a task that ensures the `js` task is complete before reloading browsers
	gulp.task('js-watch', ['scripts'], function (done) {
	    browserSync.reload();
	    done();
	});

/*  ==========================================================================
   	Images and SVGs
    ========================================================================== */

    gulp.task('images', function(){
    	return gulp.src(imgSRC)
    		.pipe(plumber({ errorHandler: reportError }))
    		.pipe(imagemin({
    			optimizationLevel: 3,
	            progessive: false,
	            interlaced: true
    		}))
    		.pipe(gulp.dest(imgDist));
    });

    gulp.task('svgsprites', function () {
	    return gulp.src(svgSRC)
	    	.pipe(plumber({ errorHandler: reportError }))
	        .pipe(rename({prefix: spritesPrefix}))
	        .pipe(svgmin({
	                removeDoctype: true
	            }, {
	                removeComments: true
	            }, {
	                cleanupNumericValues: {
	                    floatPrecision: 2
	                }
	            }, {
	                convertColors: {
	                    names2hex: true,
	                    rgb2hex: true
	                }
	            }, {
	            	cleanupIDs: {
                        minify: true
                    }
			}))
	        .pipe(svgstore({ inlineSvg: true }))
	        .pipe(gulp.dest(imgDist));
	});

/*  ==========================================================================
   	BrowserSync
    ========================================================================== */

	gulp.task('browserSync', function() {
	    browserSync.init({
			// server: true,
			// server: {
			// 	baseDir: baseDir
			// },
			// port: 3000,
			proxy: baseUrl,
	        notify: {
	            styles: {
	                top: 'auto',
	                bottom: '0',
	                borderRadius: '0px',
	                color: 'black',
	                backgroundColor: '#fdb814'
	            }
	        }
	    })
	});

/*  ==========================================================================
    Alerts and Error Reporting
    ========================================================================== */

	var reportError = function (error) {

		var lineNumber = "";
		if (error.lineNumber) {
	    	lineNumber = (error.lineNumber) ? 'LINE ' + error.lineNumber + ' -- ' : '';
	    }

	    // OS Notification bar
	    notify({
	        title: 'Task Failed [' + error.plugin + ']',
	        message: lineNumber + 'See console.',
	        sound: 'Beep' // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
	    }).write(error);
	    gutil.beep(); // Beep 'sosumi' again

	    // Pretty error reporting
	    var report = '';
	    var chalkErr = gutil.colors.white.bgRed;
	    var chalkErrMsg = gutil.colors.cyan;
	    var chalkTask = gutil.colors.white.bgBlue;
	    // var chalkBold = gutil.colors.cyan.bold;

	    report += '\n' + chalkTask(' TASK:             ') + ' ⇨  ' + chalkErrMsg(error.plugin.toUpperCase()) + '\n\n';
	    report += chalkErr(' TASK ERROR:       ');
	    report += '\n------------------------------------------------------------------------------------ \n\n';
	    report += chalkErrMsg(error.message);
	    report += '\n\n------------------------------------------------------------------------------------ \n\n';
	    if (error.lineNumber) { report += chalkErr(' LINE:          ') + ' ' + error.lineNumber + '\n\n'; }
	    if (error.fileName)   { report += chalkErr(' FILE:          ') + ' ' + error.fileName + '\n\n'; }
	    console.error(report);

	    // Prevent the 'watch' task from stopping
	    this.emit('end');
	}

/*  ==========================================================================
   	Utilities
    ========================================================================== */

    //clear the gulp cache intermitently
	gulp.task('clear', function(done) {
	    return cache.clearAll(done);
	});

/*  ==========================================================================
    Watch
    ========================================================================== */	

	// files to watch
	gulp.task('watch', function() {
	    gulp.watch(styleWatchFiles, ['styles']);
	    gulp.watch(jsWatchFiles, ['js-watch']);
	    gulp.watch(imgSRC, ['images']);
	    gulp.watch(svgSRC, ['svgsprites']);
	    gulp.watch("*.html").on("change", browserSync.reload);
	   	gulp.watch("*.php").on("change", browserSync.reload);
	});


/*  Gulp Default Task
    ========================================================================== */

	// just run $ gulp
	gulp.task('default', ['browserSync', 'watch', 'styles', 'scripts']);


