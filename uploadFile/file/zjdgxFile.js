var fs = require('fs'),
	path = require('path'),
	_ = require('underscore'),
	config = require('../config'),
	formidable = require('formidable'),
	targetPath = config.server.fileUploadPath;

exports.uploadFile = function (req, res) {
	var form = new formidable.IncomingForm();

	//after parse: all the files to upload have been writed on disk.
	//  see files-->xxxFile--->path
	form.parse(req, function (err, fields, files) {
		if (err) {
			res.render('uploadResult.jade',{
				result: -1,
				msg: 'file upload failed...'
			});
		} else {
			var succeds = 0,
					fileNumber = _.size(files);

			_.each(files, function (value, key) {
				var name = value.name,
					is = fs.createReadStream(value.path),
					os = fs.createWriteStream(targetPath + "/" + name);

				is.pipe(os);
				is.on('end', function () {
					// delete the temp file.
					fs.unlinkSync(value.path);
					succeds += 1;

					if (succeds == fileNumber) {
						res.render('uploadResult.jade',{
							result: 0,
							msg: 'File[' + name + '] upload succeeded(' + (new Date().getTime()) + ')...'
						});
					}
				});
			});
		}
	});
};