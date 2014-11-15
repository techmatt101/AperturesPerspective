var gulp = require('gulp');
var ts = require('gulp-typescript');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');

gulp.task('default', ['styles', 'scripts', 'templates']);

gulp.task('scripts', function() {
    var tsResult = gulp.src('core/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts({
            sortOutput : true,
            target: 'ES5'
        }));

    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'));
});

gulp.task('styles', function() {
    return gulp.src('styles/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/css'));
});

gulp.task('templates', function(){
    return gulp.src('views/*.hbs')
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'hbs',
            noRedeclare: true // Avoid duplicate declarations
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('build/'));
});