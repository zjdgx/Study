/**
 * Build Date: 15/8/3 16:42.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

var _ = require('underscore'),
		async = require('async'),
		moment = require("moment"),
		mysql = require('../util/mySqlPool');


exports.login = function (req, res) {
	req.session.username = req.body.username;
	req.session.email = req.body.email;
	res.redirect('/');
};

exports.newCourse = function (req, res) {
	res.render('common/newCourseApply', {title: '新课程 - zjdgx'});
};

exports.register = function (req, res) {
	mysql.mySqlQuery(
		'INSERT INTO user SET ?',
		{
			name: req.body.name,
			email: req.body.email,
			phone: req.body.phone,
			password: req.body.password,
			register_date: new Date()
		},
		function (err, result) {
			console.log(JSON.stringify(result));
			res.send(result);
		}
	);
};