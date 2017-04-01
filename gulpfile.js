"use strict";

var gulp = require('gulp'),
  prefix = require('gulp-autoprefixer'),
  livereload = require('gulp-livereload'),
  connect = require('gulp-connect'),
  sass = require('gulp-sass'),
  pug = require('gulp-pug'),
  image = require('gulp-image-optimization'),
  fonts = require('gulp-fontmin');

gulp.task('connect', function () {
  connect.server({
    root: 'build',
    livereload: true
  })
});

gulp.task('scss', function() {
    gulp.src('src/style.scss')
      .pipe(sass())
      .pipe(prefix({
        browsers: ['last 2 versions'],
      }))
      .pipe(gulp.dest('build/'))
      .pipe(connect.reload())
});

gulp.task('pug', function () {
    gulp.src('src/index.pug')
      .pipe(pug({
        pretty: true,
      }))
      .pipe(gulp.dest('build/'))
      .pipe(connect.reload())
});

gulp.task('images', function(cb) {
  gulp.src('static/images/*.+(png|jpg|gif|jpeg)')
    .pipe(image({
      optimizationLevel: 5,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('build/static/images'))
    .on('end', cb)
    .on('error', cb);
});

gulp.task('fonts', function () {
  gulp.src('static/fonts/*')
    .pipe(fonts())
    .pipe(gulp.dest('build/static/fonts/'));
});


gulp.task('watch', function () {
  gulp.watch('src/**/*.scss', ['scss']);
  gulp.watch('src/index.pug', ['pug']);
  gulp.watch('static/images/*', ['images']);
  gulp.watch('static/fonts/*', ['fonts']);
});

gulp.task('default', ['connect', 'pug', 'scss', 'images', 'fonts', 'watch']);