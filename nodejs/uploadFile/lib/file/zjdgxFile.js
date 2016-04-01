var fs = require('fs'),
	path = require('path'),
	async = require('async'),
	_ = require('underscore'),
	config = require('../../config'),
	rootPath = config.server.rootPath;
	formidable = require('formidable'),
	mongo = require('../util/db_mongodb'),
	fileUtil = require('../util/fileUtil'),
	targetPath = config.server.fileUploadPath;

exports.uploadFile = function (req, res) {
	var form = new formidable.IncomingForm();
	
	async.waterfall([
		function(cb) {
			form.parse(req, function (err, fields, file) {
				if (err) {
					cb(err);
				} else {
					console.log('path: ' + file.file.path + ', name: ' + file.file.name + ', targetPath: ' + targetPath);
					cb(null, fields, file);
				}
			});
		},
		function(fileds, file, cb) {
			console.log(JSON.stringify(file));
			var is = fs.createReadStream(file.file.path),
					os = fs.createWriteStream(path.join(rootPath, targetPath, file.file.name));

			console.log('file upload pipe startd=ed. rootPath: ' + path.join(rootPath, targetPath, file.file.name));
			is.pipe(os);
			console.log('file upload pipe started.');
			os.on('end', function (err) {
				console.log('file upload pipe end.');
				if (err) {
					cb(err);
				} else {
					console.log('file upload unlinkSync started.');
					fs.unlinkSync(file.file.path);
					cb();
				}
			});
		},
		function(cb) {
			console.log('mongodb insert started.');
			mongo.insert('uploadFiles', {
				uploadTime: new Date(),
				fileName: name,
				path: targetPath
			}, null, cb);
		}
	], function(err) {
		if (err) {
			res.json({result: -1, msg: '文件上传失败...'});
		} else {
			res.json({result: 1, msg: '文件上传成功...'});
		}
	});

};

exports.filelist = function (req, res) {
	mongo.find('uploadFiles', {}, {}, function (err, data) {
		if (err) {
			res.json({result: -1, msg: "获取文件列表失败."});
		} else {
			res.json({result: 1, files: data});
		}
	});
};