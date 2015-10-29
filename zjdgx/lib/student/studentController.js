/**
 * Build Date: 15/10/16 11:24.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */
var mysql = require('../util/mySqlPool');

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

exports.courses = function (req, res) {
	res.send({courses: [
		{
			primary: [
				{'11': '数学'},
				{'12': '语文'},
				{'13': '英语'}
			]
		},
		{
			junior: [
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
			senior: [
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
			language: [
				{'41': '英语'},
				{'42': '日语'},
				{'43': '韩语'}
			]
		},
		{
			music: [
				{'51': '手提琴'},
				{'52': '钢琴'},
				{'53': '吉他'},
				{'54': '二胡'}
			]
		},
		{
			others: [
				{'61': '书法'},
				{'61': '跆拳道'}
			]
		}
	]});
};