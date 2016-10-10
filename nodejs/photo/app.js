var fs = require('fs'),
	path = require('path'),
	mongo = require('./db_mongodb')
	photoPath = 'E:\\zjdgx\\photo';

function ListFiles( sourceFile ) {
	var fileList;
	fs.stat(sourceFile, function(err, stat){
		if (stat && stat.isDirectory()) {
			fs.readdir(sourceFile, function (err, files) {
				files.forEach(function (file) {
					ListFiles(path.join(sourceFile, file));
				});
			});
		} else {
			insertPhoto(stat, sourceFile);
		}
	});
}

function insertPhoto(stat, sourceFile) {
	mongo.insert('zjdgx-photo', {path: sourceFile, size: stat.size, ctime: stat.ctime, mtime: stat.mtime, atime: stat.atime, importTime: new Date()}, null, function (err, result) {
		if (err) {
			console.log('err');
		} else {
			console.log('ok');
		}
	});
}

ListFiles( photoPath );