var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');

var isProduction = ($.util.env.dev || $.util.env.debug ? false : true);
var isDebug = !isProduction;

$.util.log('Environment: ' + (isProduction ? 'PRODUCTION' : 'DEBUG'));

gulp.task('default', ['clean'], function() {
    gulp.start('build');
});

gulp.task('clean', del.bind(null, ['dist/**/*']));

-gulp.task('build', ['content', 'markup', 'templateHelpers', 'templates', 'views', 'icons', 'images', 'styles', 'jsLibs', 'scripts'], function() {
    if (isProduction) {
        gulp.start('size');
    }
});

gulp.task('size', function() {
    return gulp.src('dist/**/*')
        .pipe($.size({ title: 'Build size total for', showFiles: true, gzip: true }));
});

gulp.task('watch', function() {
    gulp.watch('app/styles/**/*.less', ['styles']);
    gulp.watch('app/templates/**/*.hbs', ['templates']);
    gulp.watch('app/views/**/*.hbs', ['views']);
});

//===================================================//

gulp.task('content', function() {
    return gulp.src('app/content/**/*.*')
        .pipe(gulp.dest('dist/content'));
});

gulp.task('markup', function() {
    return gulp.src('app/*.html')
        .pipe($.if(isProduction, $.htmlmin()))
        .pipe(gulp.dest('dist'));
});

gulp.task('templateHelpers', function() {
    return gulp.src('app/templateHelpers/*.js')
        .pipe($.if(isProduction, $.uglify()))
        .pipe($.concat('templateHelpers.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('templates', function() {
    return gulp.src('app/templates/*.hbs')
        .pipe($.handlebars({
            handlebars: require('handlebars')
        }))
        .pipe($.wrap('Handlebars.template(<%= contents %>); Handlebars.registerPartial("<%= stripExt(file.relative) %>", Templates.<%= stripExt(file.relative) %>)', {}, {
            imports: {
                stripExt: function(fileName) {
                    return $.util.replaceExtension(fileName, '');
                }
            }
        }))
        .pipe($.declare({
            namespace: 'Templates',
            noRedeclare: true
        }))
        .pipe($.concat('templates.js'))
        .pipe($.if(isProduction, $.uglify()))
        .pipe(gulp.dest('dist'));
});

gulp.task('views', function() {
    return gulp.src('app/views/*.hbs')
        .pipe($.handlebars({
            handlebars: require('handlebars')
        }))
        .pipe($.wrap('Handlebars.template(<%= contents %>)'))
        .pipe($.declare({
            namespace: 'Views',
            noRedeclare: true
        }))
        .pipe($.concat('views.js'))
        .pipe($.if(isProduction, $.uglify()))
        .pipe(gulp.dest('dist'));
});

gulp.task('icons', function() {
    return gulp.src('app/icons/*')
        .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
    return gulp.src('app/images/**/*.{png,jpg}')
        .pipe($.imageResize({
            width: 1200,
            upscale: false,
            quality: 0.8,
            imageMagick: true
        }))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('styles', function() {
    return gulp.src('app/styles/*.less')
        .pipe($.if(isDebug, $.sourcemaps.init()))
        .pipe($.less({ lint: isDebug }))
        .pipe($.autoprefixer())
        .pipe($.if(isDebug, $.sourcemaps.write()))
        .pipe($.if(isProduction, $.groupCssMediaQueries())) //no support for source maps
        .pipe($.if(isProduction, $.cleanCss({ advanced: true })))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('scripts', function() {
    return gulp.src('app/**/*.ts')
        .pipe($.if(isDebug, $.sourcemaps.init()))
        .pipe($.typescript({
            outFile: 'app.js',
            target: 'ES5'
        }))
        .pipe($.if(isProduction, $.uglify()))
        .pipe($.if(isDebug, $.sourcemaps.write()))
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('jsLibs', function() {
    return gulp.src([
        'node_modules/handlebars/dist/handlebars.runtime.js',
        'node_modules/browser-jsonp/lib/jsonp.js'
    ])
        .pipe($.concat('libs.js'))
        .pipe($.if(isProduction, $.uglify()))
        .pipe(gulp.dest('dist/scripts'));
});