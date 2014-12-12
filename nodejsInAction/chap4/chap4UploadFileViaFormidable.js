/**
 * Created by zjdgx on 2014/12/12 17:03.
 */

var http = require('http'),
	formidable = require('formidable');

http.createServer(function (req, res) {
	switch (req.method) {
		case 'GET':
			show(req, res);
			break;
		case 'POST':
			upload(req, res);
			break;
	}
}).listen(8000, function () {
	console.log('chap4: formidable upload file server start on port 8000.');
});


function show(req, res) {
	var html = '<html><head><title>formidable文件上传</title></head><body>'
		+ '<form method="post" action="/" enctype="multipart/form-data">'
		+ '<p><input type="text" name="name" /></p>'
		+ '<p><input type="file" name="file" /></p>'
		+ '<p><input type="submit" value="Upload" /></p></form></body></html>';

	res.setHeader('Content-type', 'text/html;charset=UTF-8');
	res.setHeader('Content-Length', Buffer.byteLength(html));
	res.end(html);
}

function upload(req, res) {
	//加上判断会输出Bad request. Content-Type为空
	/*if (!isFormData(req)) {
		res.statusCode = 400;
		res.end('Bad request: expecting multipart/form-data');
		return;
	}*/

	var form = new formidable.IncomingForm();

	form.on('field', function (field, value) {
		console.log(field);
		console.log(value);
	});

	form.on('file', function (name, file) {
		console.log(name);
		console.log(file);
	});

	form.on('progress', function (bytesReceived, bytesExpected) {
		var percent = Math.floor(bytesReceived / bytesExpected * 100);

		console.log(percent);
	})

	form.on('end', function () {
		res.end('upload complete!');
	});

	form.parse(req);
}

function isFormData(req) {
	var type = req.headers['Content-Type'] || '';
	console.log('content-type: ' + type);
	return 0 == type.indexOf('multipart/form-data');
}