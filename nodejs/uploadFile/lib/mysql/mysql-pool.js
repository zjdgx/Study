/**
 * Build Date: 2016/07/01 10:40.
 * Copyright (c): ZJDGX
 * Autor: ZJDGX
 * Description: mysql pool
 * Refs: https://cnodejs.org/topic/51676ac26d38277306fe7c85
 */

var mysql = require('mysql'),
        mysqlConfig = require('./mysql-config');

exports.createMysqlPool = module.exports.createMysqlPool = function (){
	return mysql.createPool({
        host: mysqlConfig.host,
        user: mysqlConfig.user,
        password: mysqlConfig.password,
        database: mysqlConfig.database
	});
}