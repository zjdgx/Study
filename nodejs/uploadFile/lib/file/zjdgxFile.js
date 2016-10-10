var fs = require('fs'),
		path = require('path'),
		async = require('async'),
		_ = require('underscore'),
		config = require('../../config'),
		rootPath = config.server.rootPath,
		formidable = require('formidable'),
		fileUtil = require('../util/fileUtil'),
		targetPath = config.server.fileUploadPath,
		mysql = require('../mysql/mysql-client').init();

exports.uploadFile = function (req, res) {
	var now = new Date(),
			form = new formidable.IncomingForm();
	
	async.waterfall([
		function(cb) {
			form.parse(req, function (err, fields, file) {
				if (err) {
					cb(err);
				} else {
					cb(null, fields, file);
				}
			});
		},
		function(fileds, file, cb) {
			var is = fs.createReadStream(file.fileList.path),
					os = fs.createWriteStream(path.join(rootPath, targetPath, file.fileList.name));

			is.pipe(os);
			is.on('end', function (err) {
				if (err) {
					cb(err);
				} else {
					fs.unlinkSync(file.fileList.path);
					cb(null, file.fileList.name);
				}
			});
		},
		function(name, cb) {
			mysql.query(
				'insert into uploadfiles(timeUploaded, fileName, path) values (?, ?, ?)', 
				[now, name, targetPath.replace('/static', '')],
				cb
			)
		}
	], function(err, result) {
		if (err) {
			res.json({result: -1, msg: '文件上传失败...'});
		} else {
			res.json({result: 1, msg: '文件上传成功...'});
		}
	});
};

exports.filelist = function (req, res) {
	mysql.query('select * from uploadfiles', null, function (err, data) {
		if (err) {
			res.json({result: -1, msg: "获取文件列表失败."});
		} else {
			res.json({result: 1, files: data});
		}
	});
};