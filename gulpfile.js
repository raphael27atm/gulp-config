'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
     del = require('del');

gulp.task('concatScripts', function() {
  gulp.src([
    'vendor/bower_components/jquery/dist/jquery.js',
    'vendor/bower_components/bootstrap/dist/js/bootstrap.js'])
  .pipe(maps.init())
  .pipe(concat("app.js"))
  .pipe(maps.write('../maps'))
  .pipe(gulp.dest("js"));
});

gulp.task('minifyScripts', function(){
  gulp.src("js/app.js")
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('compileSass', function(){
  gulp.src("scss/application.scss")
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('css'));
});

gulp.task('watchFiles', function(){
  gulp.watch(['scss/**/*.scss', 'js/main.js'],['compileSass', 'concatScripts']);
});

gulp.task('clean', function(){
  del(['dist', 'css/aplication.css*', 'js/app*.js*'])
});

gulp.task('build',['concatScripts','minifyScripts','compileSass'], function(){
  gulp.src([
    "css/aplication.css",
    "js/app.min.js",
    "index.html",
    "img/**",], {base: './'})
    .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['watchFiles']);
