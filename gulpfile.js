const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const removeEmptyLines = require('gulp-remove-empty-lines');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');


var config = {
	appPath: './src',
	public: './public',
	sassPath: './src/scss',
	cssPath: './themes/clappyTheme/static/css',
	jsPath: './themes/clappyTheme/static/js',
	jQuery: './node_modules/jquery/dist/jquery.min.js',
	bootstrap: './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
	app: './src/js/app.js',
};


function errorHtml(error) {
	console.log('error Nunjucks');

	console.log(error.toString());
	console.log('File: ' + error.fileName);

	this.emit('end');
};


// SASS
gulp.task('css', function () {
	return gulp.src(config.sassPath + '/styles.scss')
		.pipe(sass({ errLogToConsole: true, outputStyle: 'compact' }).on('error', sass.logError))
		.pipe(removeEmptyLines())
		.pipe(gulp.dest(config.cssPath));
});


// SCRIPTS
gulp.task('scripts', function() {
  return gulp.src([config.jQuery, config.bootstrap, config.app])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./themes/IoCashTheme/static/js/'));
});


// DEFAULT, RENDER NUNJUCKS & COMPILE SASS
gulp.task('default', gulp.series('css'));
