var gulp = require('gulp');
var ts = require('gulp-typescript');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');

gulp.task('default', ['views', 'templates', 'styles', 'scripts']);
gulp.task('dev', ['scripts', 'styles', 'views', 'templates']);
gulp.task('templates', ['template-markup']);

gulp.task('views', function () {
    return buildTemplates(gulp.src('views/*.hbs'), 'Views')
        .pipe(concat('views.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('styles', function () {
    return buildStyles(gulp.src('styles/*.less'))
        .pipe(gulp.dest('build/css'));
});

gulp.task('scripts', function () {
    return buildScripts(gulp.src('*/*.ts'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('templates', function () {
    return buildTemplates(gulp.src('templates/*.hbs'), 'Templates')
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('build'));
});

function buildTemplates(task, namespace) {
    return task
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: namespace,
            noRedeclare: true
        }));
}

function buildStyles(task) {
    return task
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write());
}

function buildScripts(task) {
    var tsResult = task
        //.pipe(sourcemaps.init())
        .pipe(ts({
            sortOutput: false,
            target: 'ES5'
        }));

    return tsResult.js
        .pipe(concat('app.js'));
    //.pipe(sourcemaps.write());
}