var gulp = require('gulp');

var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var shim = require('browserify-shim');

gulp.task('scripts', function () {
	return browserify('./src/reductio.js')
		.transform(shim)
		.bundle({ standalone: 'reductio' })
		.pipe(source('reductio.js'))
        .pipe(gulp.dest('./'))
        .pipe(rename('reductio.min.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('./'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./src/**/*.js', ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);
gulp.task('all', ['scripts']);