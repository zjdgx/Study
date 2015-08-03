/**
 * Build Date: 15/8/3 16:42.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

var _ = require('underscore'),
		async = require('async'),
		moment = require("moment");

exports.login = function (req, res) {
	req.session.username = req.body.username;
	req.session.email = req.body.email;
	res.redirect('/');
};