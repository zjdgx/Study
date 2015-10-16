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