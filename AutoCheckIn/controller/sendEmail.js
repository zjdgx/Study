/**
 * Build Date: 15/2/27 17:08.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */
var email = require('../config.js').email;
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	host: email.host,
	secureConnection: true, // use SSL
	auth: {
		user: email.user,
		pass: email.password
	}
});

/**
 * 发送邮件
 * @param contents
 */
module.exports = function (contents) {
	transporter.sendMail({
		from: email.user,
		to: email.toUser,
		subject: 'checkIn success!',
		text: contents || 'is test!'
	}, function (error, response) {
		if (error) {
			console.log(error);
		} else {
			console.log("Message sent: " + response.response);
		}

		transporter.close(); // 如果没用，关闭连接池
	});
};