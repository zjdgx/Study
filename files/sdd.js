/**
 * Build Date: 16/1/21 15:36.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */
var fs = require('fs'),
	path = require('path');

fs.readdir('e:/zjdgx/photo/Ó×¶ùÔ°/20151009/', function (err, files) {
	files.forEach(function (file) {
		console.log(typeof file)
	})
});