/**
 * Build Date: 15/8/18 13:42.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */


var mysql = require('mysql'),
	generalPool = require('generic-pool');

var pool = mysql.createPool({
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: 'root',
	database: 'zjdgx',
	charset: 'utf8',
	acquireTimeout: 2000,
	queueLimit: 5
});

exports.mySqlQuery = function (sql, data, cb) {
	pool.getConnection(function (err, connection) {
		connection.query(sql, data, function (err, result) {
			cb && cb(result);
			connection.release();
		});
	});
};