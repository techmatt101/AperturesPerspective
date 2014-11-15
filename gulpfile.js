var gulp = require('gulp');
var ts = require('gulp-typescript');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');


function buildTemplates(task) {
    return task
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'hbs',
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
        .pipe(sourcemaps.init())
        .pipe(ts({
            sortOutput: true,
            target: 'ES5'
        }));

    return tsResult.js
        .pipe(sourcemaps.write());
}

gulp.task('default', ['views', 'templates', 'styles', 'scripts']);
gulp.task('dev', ['scripts', 'styles', 'views', 'templates']);
gulp.task('templates', ['template-markup', 'template-styles', 'template-scripts']);

gulp.task('views', function () {
    return buildTemplates(gulp.src('views/*.hbs'))
        .pipe(concat('views.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('styles', function () {
    return buildStyles(gulp.src('styles/*.less'))
        .pipe(gulp.dest('build/css'));
});

gulp.task('scripts', function () {
    return buildScripts(gulp.src('core/*.ts'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('template-markup', function () {
    return buildTemplates(gulp.src('templates/*/template.hbs'))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('template-styles', function () {
    return buildStyles(gulp.src('templates/*/style.less'))
        .pipe(concat('templates.css'))
        .pipe(gulp.dest('build/css'));
});

gulp.task('template-scripts', function () {
    return buildScripts(gulp.src('templates/*/script.ts'))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('build/js'));
});