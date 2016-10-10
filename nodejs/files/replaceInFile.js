/**
 * Build Date: 16/04/05 15:24.
 * Author: ZJDGX	
 * Description:
 *	ES6文件批量重命名
 * Requirements:
 *	文件名格式:
 *		xxx_201604x050x00000.jpg、xxx_20160405000000.jpg、xxx_201_x60405000000.jpg
 * Usage:
 *	node renamePhoto.js path_name location_name
 */

'use strict';

let fs = require('fs'),
		path = require('path'),
		dir = process.argv[2],
		colors = require('colors'),
		location = process.argv[3];
	
if (!dir) {
	console.error('路径不能为空....'.white.bgRed);
	return;
}
	
fs.exists(dir, (exists) => {
	if (exists) {
		fs.readdir(dir, (err, data) => {
			data.map((file, index) => {
				fs.rename(path.join(dir, file), path.join(dir, file.replace(/\D/g, '') + location + file.substring(file.lastIndexOf('.'))));
			});
		});
	} else {
		console.error('路径设置错误....'.white.bgRed);
	}
});