var compass = require('gulp-compass'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    watch = require('gulp-watch'),
    gulp = require('gulp'),
    path = require('path');

gulp.task('styles-libs', function () {
    return gulp.src('app/assets/stylesheets/css/*.css')
        .pipe(concat('css-libs.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('public/'))
        .pipe(notify('CSS libs compiled successfully in public/css-libs.css!'));
});

gulp.task('styles-app', function () {
    var stylesheetsPath = 'app/assets/stylesheets/';

    return gulp.src([stylesheetsPath + 'sass/*.scss'])
        .pipe(compass({
            project: path.join(__dirname, 'app', 'assets', 'stylesheets'),
            sass: 'sass',
            css: 'css'
        }))
        .pipe(concat('compass.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('public/'))
        .pipe(notify('SCSS styles compiled successfully in public/compass.css!'));
});

gulp.task('concat', function () {
    var pathToJsFolder = 'app/assets/javascripts/',
        libsPath = pathToJsFolder + 'libs/',
        appPath = pathToJsFolder + 'app/',
        libsArray = [
            'jquery.js',
            'bootstrap.min.js',
            'bootstrap-datepicker.js',
            'underscore.js', 'backbone.js',
            'backbone.Validation.js',
            'backbone.ModelBinder.js',
            'backbone.CollectionBinder.js'
        ], appArray = [
            'init.js',
            'Helpers/Base.js',
            'Models/Session.js',
            'Models/User.js',
            'Models/UserActions.js',
            'Models/InfoTab.js',
            'Views/InfoTab.js',
            'Views/UserActions.js',
            'Views/Main.js',
            'Routers/App.js',
            'entry-point.js'
        ];

    function createAppPath (path) {
        return appPath + path;
    }

    function createLibsPath (path) {
        return libsPath + path;
    }

    return gulp.src(libsArray.map(createLibsPath).concat(appArray.map(createAppPath)))
        .pipe(concat('client.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/'))
        .pipe(notify('Scripts compiled successfully in public/client.js!'));

});

gulp.task('default', function () {
    gulp.run(['concat', 'styles-libs', 'styles-app']);

    gulp.watch('app/assets/javascripts/**/*.js', function () {
        gulp.run('concat');
    });

    gulp.watch(['app/assets/stylesheets/sass/*.scss'], function () {
        gulp.run('styles-app');
    });
});