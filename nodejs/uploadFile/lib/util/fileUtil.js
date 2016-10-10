/**
 * Build Date: 15/4/14 14:18.
 * Copyright (c): NHN China Co.,LTD
 * Author: ZJDGX
 * Description:
 */
var fs = require('fs'),
	path = require('path');

Number.prototype.toFixString = function (number) {
	var result = this.toString();

	if (result.length < number) {
		for (var i = 0; i < result.length; i++) {
			result = '0' + result;
		}
	}

	return result;
};

exports.mkdirs = function (dirpath, callback) {
	fs.exists(dirpath, function (exists) {
		if (exists) {
			callback(null);
		} else {
			mkdirs(path.dirname(dirpath), function (err) {
				if (err) return callback(err);
				fs.mkdir(dirpath, callback);
			});
		}
	});
};

exports.createDateFolder = function (root, dirpath, callback) {
	var date = new Date(),
		datePath = path.join(dirpath, date.getFullYear() + (date.getMonth() + 1).toFixString(2) + date.getDate().toFixString(2));

	fs.exists(path.join(root, datePath), function (exists) {
		if (exists) {
			callback(datePath);
		} else {
			fs.mkdir(datePath, function (err) {
				if (err) {
					callback(err);
				} else {
					callback(null, datePath);
				}
			});
		}
	});
};