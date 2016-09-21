// gulpfile

// include gulp
var gulp = require('gulp');

// include plug-ins
var browserSync = require('browser-sync').create();
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var reload = browserSync.reload;

gulp.task('scripts', function() {
	gulp.src(['./src/js/*.js'])
		.pipe(concat('datepicker.js'))
		.pipe(gulp.dest('./build/js/'));
});

gulp.task('styles', function() {
  gulp.src(['./src/css/*.css'])
    .pipe(concat('datepicker.css'))
    .pipe(gulp.dest('./build/css/'));
});

// browsersync
gulp.task('browser-sync', function(){
  browserSync.init({
  	server: {
            baseDir: "./build/",
            middleware: function (req, res, next) {
            	//console.log('Adding CORS header for ' + req.method + ': ' + req.url);
            	res.setHeader('Access-Control-Allow-Origin', '*');
            	next();
            }
        },
    logConnections: true
  });
  gulp.watch('./src/*.html', ['htmlpage']).on('change', browserSync.reload);
  gulp.watch('./src/css/*.css', ['styles']).on('change', browserSync.reload);
  gulp.watch('./src/js/*.js', ['scripts']).on('change', browserSync.reload);
  gulp.watch('./src/js/*/*.js', ['scripts']).on('change', browserSync.reload);
});

// default task
gulp.task('default', ['browser-sync']);
