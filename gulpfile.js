var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    webpack = require('webpack-stream'),
    browserSync = require('browser-sync'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    rename = require("gulp-rename"),
    flatten = require("gulp-flatten");

var plumberErrorHandler = {
  errorHandler: notify.onError({
    title: 'Gulp',
    message: 'Error: <%= error.message %>'
  })
};

gulp.task('sass', function () {
  return gulp.src("resource/sass/app.scss")
  .pipe(plumber(plumberErrorHandler))
  .pipe(sass({
    outputStyle: 'compressed',
    includePaths: ['./node_modules']
  }))
  .pipe(autoprefixer())
  .pipe(rename(function (path) {
    path.basename = 'app';
  }))
  .pipe(gulp.dest("assets/css"));
});

gulp.task('fonts', function () {
  return gulp.src('node_modules/**/*.{eot,ttf,woff,woff2}')
  .pipe(flatten())
  .pipe(gulp.dest("assets/fonts"));
});

gulp.task('js', function () {
  return gulp.src("resource/js/app.js")
  .pipe(webpack(require("./webpack.config.js")))
  .pipe(gulp.dest("assets/js"));
});

gulp.task('watch', ['sass', 'js', 'fonts'], function () {
  browserSync.init({
    server: "./"
  });
  gulp.watch("resource/sass/**/*.**", ['sass']);
  gulp.watch("resource/js/**/*.**", ['js']);
  gulp.watch("assets/css/**/*.css").on('change', browserSync.reload);
  gulp.watch("assets/js/**/*.js").on('change', browserSync.reload);
  gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('default', ['watch']);