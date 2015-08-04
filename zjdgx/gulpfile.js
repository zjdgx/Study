/**
 * Build Date: 15/8/4 13:36.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */
var gulp = require('gulp'),
		bower = require('gulp-bower'),
		uglify = require('gulp-uglify'),
		concat = require('gulp-concat'),
		minifyCss = require('gulp-minify-css');

gulp.task('bower', function() {
	return bower()
		.pipe(gulp.dest('./'));
});

gulp.task('css-concat', function () {
	gulp.src(['node_modules/normalize.css/normalize.css', 'static/css/pages.css'])
		.pipe(concat('index.min.css'))
		.pipe(minifyCss())
		.pipe(gulp.dest('static/css/'));
	gulp.src(['node_modules/normalize.css/normalize.css', 'static/css/student.css'])
		.pipe(concat('student.min.css'))
		.pipe(minifyCss())
		.pipe(gulp.dest('static/css/'));
	gulp.src(['node_modules/normalize.css/normalize.css', 'static/css/teacher.css'])
		.pipe(concat('teacher.min.css'))
		.pipe(minifyCss())
		.pipe(gulp.dest('static/css/'));
});

gulp.task('default', ['css-concat']);