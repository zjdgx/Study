/**
 * Build Date: 15/8/4 13:36.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */
var gulp = require('gulp'),
		wrap = require('gulp-wrap'),
		bower = require('gulp-bower'),
		uglify = require('gulp-uglify'),
		concat = require('gulp-concat'),
		replace = require('gulp-replace'),
		declare = require('gulp-declare'),
		minifyCss = require('gulp-minify-css'),
		handlebars = require('gulp-handlebars');

gulp.task('css-concat', function () {
	gulp.src(['node_modules/normalize.css/normalize.css', 'static/css/common.css', 'static/css/components/popup.css', 'static/css/index.css'])
		.pipe(concat('index.min.css'))
		.pipe(minifyCss())
		.pipe(gulp.dest('static/css/'));
	gulp.src(['node_modules/normalize.css/normalize.css', 'static/css/common.css', 'static/css/components/popup.css', 'static/css/student.css'])
		.pipe(concat('student.min.css'))
		.pipe(minifyCss())
		.pipe(gulp.dest('static/css/'));
	gulp.src(['node_modules/normalize.css/normalize.css', 'static/css/common.css', 'static/css/components/popup.css', 'static/css/teacher.css'])
		.pipe(concat('teacher.min.css'))
		.pipe(minifyCss())
		.pipe(gulp.dest('static/css/'));
});

gulp.task('js-min', function () {
	gulp.src(['bower_components/jquery/jquery.js'])
		.pipe(uglify())
		.pipe(gulp.dest('static/js/common'));
	gulp.src('bower_components/backbone/backbone-min.js')
		.pipe(concat('backbone.min.js'))
		.pipe(gulp.dest('static/js/common'));
	gulp.src('bower_components/underscore/underscore-min.js')
		.pipe(concat('underscore.min.js'))
		.pipe(gulp.dest('static/js/common'));
	gulp.src('bower_components/handlebars/handlebars.min.js')
		.pipe(concat('handlebars.min.js'))
		.pipe(gulp.dest('static/js/common'));
	gulp.src(['js/requireConfig.js', 'bower_components/requirejs/require.js'])
		.pipe(concat('require.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('static/js/common'));
});

gulp.task('requirejs', function () {
	gulp.src(['static/js/requireConfig.js', 'bower_components/requirejs/require.js'])
		.pipe(replace(/<%=\s*(\w+)\s*%>/g, function(s, key) {
			return {
				baseUrl: 'js',
				requireJSVersion: new Date().getTime()
			}[key];
		}))
		.pipe(concat('require.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('static/js/common'));
});

gulp.task('templates', function(){
	gulp.src('static/js/**/*.hbs', {base: 'static/js'})
		.pipe(handlebars())
		.pipe(wrap('Handlebars.template(<%= contents %>)'))
		.pipe(concat('templates.js'))
		.pipe(gulp.dest(''));
});

gulp.task('default', ['css-concat', 'js-min', 'requirejs']);