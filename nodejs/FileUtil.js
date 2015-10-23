/**
 * Build Date: 15/10/21 14:46.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */


var fs = require('fs'),
		path = require('path');

fs.readdir(path.join('/', '../'), function (err, files) {

	files.forEach(function(value) {
		console.log(value);
	})
})
