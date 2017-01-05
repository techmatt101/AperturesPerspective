var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var glob = require('glob');

var isProduction = ($.util.env.dev || $.util.env.debug ? false : true);
var isDebug = !isProduction;

$.util.log('Environment: ' + (isProduction ? 'PRODUCTION' : 'DEBUG'));

gulp.task('default', ['clean'], function() {
    gulp.start('build');
});

gulp.task('clean', del.bind(null, ['dist/**/*']));

gulp.task('build', ['content', 'markup', 'templateHelpers', 'templates', 'views', 'icons', 'images', /*'fonts', 'font-icons',*/ 'styles', 'scripts', 'access-file'], function() {
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
});

//===================================================//

/* TODO:
 - Responsive Images
 - WebP Images
 - Favicons
 - SVG optimize
 */

gulp.task('content', function() {
    return gulp.src('app/content/**/*.*')
        .pipe(gulp.dest('dist/content'));
});

gulp.task('markup', function() {
    return gulp.src('app/*.html')
        .pipe($.if(isProduction, $.minifyHtml()))
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
        .pipe($.handlebars())
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
        .pipe($.handlebars())
        .pipe($.wrap('Handlebars.template(<%= contents %>)'))
        .pipe($.declare({
            namespace: 'Views',
            noRedeclare: true
        }))
        .pipe($.concat('views.js'))
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
        //.pipe($.rename({ suffix: "-x2" }))
        .pipe(gulp.dest('dist/images'));
});

//gulp.task('fonts', function() {
//    return gulp.src('app/fonts/**/*.{eot,svg,ttf,woff}')
//        .pipe($.flatten())
//        .pipe(gulp.dest('dist/fonts'));
//});
//
//gulp.task('font-icons', function() {
//    return gulp.src('app/font-icons/*.svg')
//        .pipe($.iconfontCss({
//            fontName: 'font-icons',
//            targetPath: '../styles/font-icons.css',
//            fontPath: '../fonts/'
//        }))
//        .pipe($.iconfont({
//            fontName: 'font-icons',
//            appendCodepoints: true
//        }))
//        .pipe(gulp.dest('dist/fonts'));
//});

gulp.task('styles', /*['markup'],*/ function() {
    var bowerResolve = require('less-plugin-bower-resolve');

    return gulp.src('app/styles/*.less')
        .pipe($.if(isDebug, $.sourcemaps.init()))
        .pipe($.less({ plugins: [bowerResolve], lint: isDebug }))
        .pipe($.autoprefixer())
        .pipe($.if(isDebug, $.sourcemaps.write()))
        .pipe($.if(isProduction, $.groupCssMediaQueries())) //no support for source maps
        //.pipe($.if(isProduction, $.uncss({ html: glob.sync('dist/*.html'), ignore: ['.update-browser'] }))) //no support for source maps
        .pipe($.if(isProduction, $.cleancss({ advanced: true })))
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
//
//gulp.task('jsLibs', function() {
//    return gulp.src([
//        'bower_components/handlebars/handlebars.runtime.min.js',
//        'bower_components/qwest/qwest.min.js',
//        'bower_components/jsonp/jsonp.js'
//    ])
//        .pipe(gulp.dest('dist/scripts'));
//});

gulp.task('access-file', function() {
    return gulp.src('bower_components/apache-server-configs/dist/.htaccess')
        .pipe(gulp.dest('dist'));
});