/**
 * Build Date: 15/10/16 11:24.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */
var _ = require('underscore'),
		mysql = require('./mySqlPool');

exports.main = function (req, res) {
	res.render('student/studentList', {
		cur: 'student'
	});
};

exports.studentList = function (req, res) {
	var offset = req.body.offset || 0,
		limit = req.body.limit;

	mysql.mySqlQuery(
		'SELECT * FROM student' + (limit ? ' limit ' + offset + ', ' + limit : ''),
		{},
		function (result) {
			res.send(result);
		}
	);
};

exports.getCourses = function (req, res) {
	mysql.mySqlQuery(
		'SELECT type, parentType, name FROM subjects',
		{},
		function (result) {
			var subCourses = [],
					mainCourses = [],
					courses = _.groupBy(result, 'parentType');

			mainCourses = _.map(courses['0'], function (item) {
				return {type: item.type, name: item.name};
			});
			subCourses = _.map(courses, function (item) {

			});

			res.send();
		}
	);
};

exports.addCourse = function (req, res) {

};
/*
 res.send({courses: [
 {
 '小学': [
 {'11': '数学'},
 {'12': '语文'},
 {'13': '英语'}
 ]
 },
 {
 '初中': [
 {'21': '数学'},
 {'22': '语文'},
 {'23': '英语'},
 {'24': '物理'},
 {'25': '化学'},
 {'26': '政治'},
 {'27': '历史'},
 {'28': '生物'}
 ]
 },
 {
 '高中': [
 {'31': '数学'},
 {'32': '语文'},
 {'33': '英语'},
 {'34': '物理'},
 {'35': '化学'},
 {'36': '政治'},
 {'37': '历史'},
 {'38': '生物'}
 ]
 },
 {
 '语言': [
 {'41': '英语'},
 {'42': '日语'},
 {'43': '韩语'}
 ]
 },
 {
 '音乐': [
 {'51': '手提琴'},
 {'52': '钢琴'},
 {'53': '吉他'},
 {'54': '二胡'}
 ]
 },
 {
 '其他': [
 {'61': '书法'},
 {'61': '跆拳道'}
 ]
 }
 ]});
 */