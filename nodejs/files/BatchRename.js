/**
 * Build Date: 16/1/21 15:24.
 * Copyright (c): NHN China Co.,LTD
 * Author: ZJDGX
 * Description:
 */
 
'use strict';

var fs = require('fs'),
		exports = module.exports;

function FormatInteger(num, length) {
	return (num / Math.pow(10, length)).toFixed(length).substr(2);
}

exports.renamePhoneFormatPhoto = (path) => {
	// 重命名手机格式照片: IMG_20160416_165018.jpg
	fs.readdir(path, (err, files) => {
		var len = files.length,
			digitLen = len.toString().length;

		files.forEach((file, index) => {
			fs.rename(path + file, path + file.replace(/IMG_(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})/, '$1-$2-$3-$4-$5-$6'), (err, data) => {
				if (err) {
					console.error('文件 (' + (path + file) + ') 重命名出错, err: ' + JSON.stringify(err));
				}
			});
		});
	});
}

exports.renameMultiDirectories = (path, target) => {
	fs.readdir(path, function (err, files) {
		var len = files.length,
			digitLen = len.toString().length;

		files.forEach(function (file, index) {
			fs.rename(path + file, target + file.replace(/IMG_(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})/, '$1-$2-$3-$4-$5-$6'), (err, data) => {
				if (err) {
					console.error('文件 (' + (path + file) + ') 重命名出错, err: ' + JSON.stringify(err));
				}
			});
			
			/*fs.stat(path + '\\' + file, function (err, stats) {
				if (stats.isDirectory()) {
					renameFiles(path + file + '/');
				} else {
					var fileName = target + file.replace(/IMG_(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})/, '$1-$2-$3-$4-$5-$6')
					var fileName = path.match(/[\/(1)]\d{8}[\/{1}]$/)[0].replace(/\//g,'').replace(/(\d{4})(\d{2})(\d{2})/,'$1-$2-$3'),
							dest = target + fileName + '-' + FormatInteger(index + 1, digitLen) + file.substr(file.lastIndexOf('.'));

					fs.rename(path + file, dest, function (err, data) {
						if (err) {
							console.error('文件 (' + (path + file) + ') 重命名出错, err: ' + JSON.stringify(err));
						}
					});
				}
			});*/
		});
	});
}

function renamePhoneFormatPhoto (path) {
	fs.readdir(path, (err, files) => {
		var len = files.length,
			digitLen = len.toString().length;

		files.forEach((file, index) => {
			if (/IMG_(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})/.test(file)) {
			// 重命名手机格式照片: IMG_20160416_165018.jpg
				fs.rename(path + '\\' + file, path + '\\' + file.replace(/IMG_(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})/, '$1-$2-$3-$4-$5-$6'), (err, data) => {
					if (err) {
						console.error('文件 (' + (path + file) + ') 重命名出错, err: ' + JSON.stringify(err));
					}
				});
			} else {
			// 其他格式照片读取照片的birthtime, 然后转换格式
				fs.stat(path + '\\' + file, function (err, stats) {
					if (stats.isFile()) {
						var date = new Date(stats.birthtime),
							year = date.getFullYear(),
							month = date.getMonth() + 1,
							day = date.getDate(),
							hour = date.getHours(),
							minute = date.getMinutes(),
							seconds = date.getSeconds(),
							suffix = file.substring(file.lastIndexOf('.'));
							
						fs.rename(path + '\\' + file, path + '\\' + (year + '-' + month + '-' + day + '-' + hour + '-' + minute + '-' + seconds + suffix), (err, data) => {
							if (err) {
								console.error('文件 (' + (path + file) + ') 重命名出错, err: ' + JSON.stringify(err));
							}
						});
					}
				});
			}
		});
	});
}

//renameFiles('E:/2016/photo/temp/', 'E:/2016/photo/temp/');

//renamePhoneFormatPhoto('E:/2016/photo/temp')
renamePhoneFormatPhoto('E:/2016/photo/');

//readFileInfo('E:/2016/photo/6123AD69F4532CF3435CE15F8D518CE6.jpg');
