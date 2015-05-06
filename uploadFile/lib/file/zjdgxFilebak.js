var fs = require('fs'),
	path = require('path'),
	_ = require('underscore'),
	config = require('../../config'),
	formidable = require('formidable'),
	mongo = require('../util/db_mongodb'),
	fileUtil = require('../util/fileUtil'),
	targetPath = config.server.fileUploadPath;

exports.uploadFile = function (req, res) {
	formidable.UPLOAD_DIR = 'uploadFiles/tmp';
	var form = new formidable.IncomingForm();

	//after parse: all the files to upload have been writed on disk.
	//  see files-->xxxFile--->path

	form.parse(req, function (err, fields, files) {
		if (err) {
			res.render('uploadResult.jade', {
				result: -1,
				msg: 'file upload failed...'
			});
		} else {
			var succeds = 0, fileNumber = _.size(files);

			_.each(files, function (value, key) {
				var name = value.name,
					is = fs.createReadStream(value.path),
					os = null;


				os = fs.createWriteStream(targetPath);

				is.pipe(os);
				is.on('end', function () {
					// delete the temp file.
					fs.unlinkSync(value.path);

					mongo.insert('uploadFiles', {
						uploadTime: new Date(),
						fileName: name,
						path: targetPath
					}, null, function (err) {
						if (err) {
							res.json({result: -1, msg: err});
						} else {
							succeds += 1;
						}
					});

					if (succeds == fileNumber) {
						mongo.find('uploadFiles', {}, {}, function (err, data) {
							if (err) {
								res.json({result: -1, msg: "上传成功, 查询失败."});
							} else {
								res.json({result: 1, msg: "上传成功...", files: data});
							}
						});
					}
				});
			});
		}
	});
};

exports.filelist = function (req, res) {
	mongo.find('uploadFiles', {}, {}, function (err, data) {
		if (err) {
			res.json({result: -1, msg: "查询失败."});
		} else {
			res.json({result: 1, files: data});
		}
	});
};

exports.zjdgxUploadFile = function(req, res) {
	// 获得文件的临时路径
	var tmp_path = req.files.file.path;
	// 指定文件上传后的目录 - 示例为"images"目录。
	var target_path = 'uploadFiles/' + req.files.file.name;
	// 移动文件
	fs.rename(tmp_path, target_path, function(err) {
		if (err) throw err;
		// 删除临时文件夹文件,
		fs.unlink(tmp_path, function() {
			if (err) throw err;
			res.send('File uploaded to: ' + target_path + ' - ' + req.files.file.size + ' bytes');
		});
	});
}