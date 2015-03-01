/**
 * Build Date: 15/2/27 16:25.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

var connect = require('connect');

var app = connect()
			.use(connect.cookieParser('zjdgx cookie parser test'))
			.use(function (req, res) {
				console.log(req.cookies);
				console.log(req.signedCookies);
				res.end('hello...\n');
			}).listen(8000);