// Dependancies
var gulp         = require('gulp'),
	compass      = require('gulp-compass'),
	minifycss    = require('gulp-minify-css'),
	uglify       = require('gulp-uglify'),
	jshint       = require('gulp-jshint'),
	del          = require('del'),
	rename       = require('gulp-rename');

// Build consts
const JSFILES   = './src/js/*.js',
	  SCSSFILES = './src/scss/*.scss',
	  BUILDDIR  = './build';


/**
 * Clean the build dir
 */
gulp.task('clean', function() {
	del([BUILDDIR + '/*']);
});

/**
 * JShint code, minify and move to build/
 */
gulp.task('js', function() {
	return gulp.src(JSFILES)
			// JSHint
			.pipe(jshint())
			.pipe(jshint.reporter('jshint-stylish'))
			.pipe(jshint.reporter('fail'))

			// Uglify
			.pipe(uglify({preserveComments: 'some'}))

			// Move
			.pipe(rename('jquery.loadmask-plus.min.js'))
			.pipe(gulp.dest(BUILDDIR));
});

/**
 * Convert SCSS to CSS and minify to the build/ folder
 */
gulp.task('scss', function() {
	return gulp.src(SCSSFILES)
			// Compass
			.pipe(compass({
				config_file: './config.rb',
				css: './src/css',
				sass: './src/scss'
			}))

			// Minify
			.pipe(minifycss({ keepSpecialComments: '*' }))

			// Move
			.pipe(rename('jquery.loadmask-plus.min.css'))
			.pipe(gulp.dest(BUILDDIR));
});

/**
 * Remove ./src/css
 */
gulp.task('remove-css', ['scss'], function() {
	del(['./src/css/'])
});

gulp.task('default', ['clean', 'js', 'scss', 'remove-css'])