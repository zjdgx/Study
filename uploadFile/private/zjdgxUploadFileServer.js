// JavaScript v

var http = require('http'),
	fs = require('fs'),
	url = require('url'),
	path = require('path');
	
http.createServer(function(req, res) {
	var url = req.url;
	if (url === '/upload') {
			
	} else {
	}
	res.end('url: '+url);
}).listen(8000, function() {
	console.log('UploadFile server start on port 8000.');
});