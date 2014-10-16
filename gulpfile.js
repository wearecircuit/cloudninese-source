var gulp = require('gulp');
var fileinclude = require('gulp-file-include');
var less = require('gulp-less');
var connect = require('gulp-connect');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');
var clean = require('gulp-clean');

var settings = {
    build: './build',
    source: './source',
    port: 8080
};

gulp.task('clean', function () {
    return gulp.src(settings.build, {read: false})
        .pipe(clean());
});

gulp.task('connect', function() {
    connect.server({
        root: settings.build,
        port: settings.port,
        livereload: true
    });


});

gulp.task('fileinclude', function() {
    gulp.src(['source/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(settings.build))
        .pipe(connect.reload());
});


gulp.task('less', function() {
    gulp.src('./source/less/css.less')
        .pipe(less({ compress: true }))
        .pipe(gulp.dest('./build'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(settings.source + '/less/**/*.*', ['less']);
    gulp.watch(settings.source + '/**/*.html', ['fileinclude']);

    var bundler = watchify(browserify(settings.source + '/js/script.js', watchify.args));

    bundler.transform('browserify-handlebars');

    bundler.on('update', rebundle);
    bundler.on('log', function(msg){
        gutil.log(gutil.colors.magenta(msg));
    });


    function rebundle() {
        return bundler.bundle()

            // log errors if they happen
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source('js.js'))
            .pipe(gulp.dest(settings.build))
            .pipe(connect.reload());


    }

    return rebundle();

});

gulp.task('default', ['connect', 'less', 'fileinclude', 'watch']);