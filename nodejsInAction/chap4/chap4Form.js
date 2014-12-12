/**
 * Created by zjdgx on 2014/12/12 16:19.
 */

var http = require('http'),
	qs = require('querystring'),
	items = [];

http.createServer(function (req, res) {
	if ('/' == req.url) {
		switch (req.method) {
			case 'GET':
				show(res);
				break;
			case 'POST':
				add(req, res);
				break;
			default:
				badRequest(res);
		}
	} else {
		notFound(res);
	}
}).listen(8000, function () {
	console.log('chap4: form start on port 8000.');
});

function show(res) {
	var html = '<html><head><title>从表单中接受用户输入</title></head><body>'
		+ '<h1>Todo List</h1><ul>'
		+ items.map(function (item) {
			return '<li>' + item + '</li>';
		})
		+ '</ul><form method="POST" action="/">'
		+ '<p><input type="text" name="item"></p>'
		+ '<p><input type="submit" name="Add Item"></p></form></body></html>';
	res.setHeader('Content-Type', 'text/html;charset=UTF-8');
	res.setHeader('Content-Length', Buffer.byteLength(html));
	res.end(html, 'utf8');
}

function add(req, res) {
	var body = '';

	req.setEncoding('utf8');
	req.on('data', function (chunk) {
		body += chunk;
	});
	req.on('end', function () {
		var obj = qs.parse(body);
		items.push(obj.item);
		show(res);
	})
}

function badRequest(res) {
	res.statusCode = 400;
	res.setHeader('Content-Type', 'text/plain');
	res.end('bad request.');
}

function notFound(res) {
	res.statusCode = 404;
	res.setHeader('Content-Type', 'text/plain');
	res.end('not found.');
}