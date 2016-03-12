/**
 * Build Date: 15/10/24 10:06.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

var mysql = require('./mySqlPool');

exports.getProvinces = function (req, res) {// ËÄ´¨
	mysql.mySqlQuery(
		'SELECT * FROM city where level=2;',
		{},
		function (result) {
			res.send({province: result});
		}
	);
};

exports.getCity = function (req, res) {// ³É¶¼
	mysql.mySqlQuery(
		'SELECT * FROM city where level = 3 and parentId = ' + req.query.id,
		{},
		function (result) {
			res.send({city: result});
		}
	);
};

exports.getCounty = function (req, res) {
	mysql.mySqlQuery(
		'SELECT * FROM city where level = 4 and parentId = ' + req.query.id,
		{},
		function (result) {
			res.json({county: result});
		}
	);
};

exports.getTown = function (req, res) {
	mysql.mySqlQuery(
		'SELECT * FROM city where level = 5 and parentId = ' + req.query.id,
		{},
		function (result) {
			res.json({town: result});
		}
	);
};
