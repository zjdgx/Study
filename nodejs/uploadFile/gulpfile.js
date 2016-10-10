/**
 * title: gulp test
 * author: zjdgx
 * date: 2015-03-05
 * note: 
 *   1. npm update for windows:
 *  https://github.com/npm/npm/wiki/Troubleshooting
 *   2. npm install relative modules:
 *  http://markpop.github.io/2014/09/17/Gulp%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/
 *  the module 'gulp-rename' should be installed before module 'gulp-concat'
 */
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

gulp.task('styles', function() {
  return gulp.src('static/style/*.css')
  .pipe(concatCss('upload.style.css'))
  .pipe(gulp.dest('static/upload/css'))
  .pipe(rename({basename: 'upload.style', suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('static/upload/css'))
  .pipe(notify({message:'Styles task complete'}));
});

gulp.task('scripts', function(){
  return gulp.src('static/js/common/jquery-1.8.1.js')
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('default'))
  .pipe(gulp.dest('static/upload/js'))
  .pipe(rename({basename: 'upload.common', suffix:'.min'}))
  .pipe(uglify())
  .pipe(gulp.dest('static/upload/js'))
  .pipe(notify({message:'Scripts task complete'}));
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
  .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
  .pipe(gulp.dest('static/upload/img'))
  .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('clean', function(cb) {
  del(['static/upload/js', 'static/upload/css', 'static/upload/img'], cb);
});

gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts', 'images');
});