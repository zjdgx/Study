/**
 * Build Date: 15/8/26 8:06.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

var fs = require('fs'),
		path = require('path'),
		async = require('async'),
		multiparty = require('multiparty');

exports.uploadFile = function (req, res) {
	var form = new multiparty.Form();

	async.waterfall([
		function (cb) {
			form.parse(req, function (err, fields, files) {
				if (err) {
					cb(err);
				} else {
					cb(null, fields, files);
				}
			});
		},
		function (fields, files, cb) {
			if (files.file.length) {
				files.file.forEach(function (file) {
					var now = new Date().getTime(),
							source = fs.createReadStream(file.path),
							dest = fs.createWriteStream(path.join(__dirname + '../../../static/uploadFiles/' + now + '.jpg'));

					source.pipe(dest);
					source.on('end', function () {
						cb(null, path.join('uploadFiles\/' + now + '.jpg'));
					});
					source.on('error', function (err) {
						cb(err);
					});
				});
			}
		}
	], function (err, fields) {
		if (err) {
			res.end('file upload error.');
		} else {
			res.json({file: fields});
		}
	});
};