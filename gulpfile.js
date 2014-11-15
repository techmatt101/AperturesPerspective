var gulp = require('gulp');
var ts = require('gulp-typescript');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['styles', 'scripts']);

gulp.task('scripts', function() {
    var tsResult = gulp.src('core/ts/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts({
            sortOutput : true,
            target: 'ES5'
        }));

    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('core/js'));
});

gulp.task('styles', function() {
    return gulp.src('core/less/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('core/css'));
});