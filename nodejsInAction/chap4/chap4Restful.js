/**
 * Created by zjdgx on 2014/12/12.
 * 	nodejs in action chap4: restful
 * 	 'put' 没实现
 */


var http = require('http'),
	url = require('url'),
	items = [];

http.createServer(function (req, res) {
	switch (req.method) {
		case 'POST':
			var item = '';

			req.setEncoding('utf8');

			req.on('data', function (data) {
				item += data;
			});

			req.on('end', function () {
				items.push(item);
				res.end('Post OK!');
			});
			break;
		case 'GET':
			items.forEach(function (item, i) {
				res.write(i + ') ' + item + '\n');
			});

			res.end('Get OK!');
			break;
		case 'DELETE':
			var path = url.parse(req.url).pathname,
				i = parseInt(path.slice(1), 10);
			if (isNaN(i)) {
				res.statusCode = 404;
				res.end('Invalid item id.');
			} else if (!items[i]) {
				res.statusCode = 404;
				res.end('Item not found.');
			} else {
				items.splice(i, 1);
				res.end('Delete OK!');
			}
			break;
		case 'PUT':
			console.log('put');
			var query = url.parse(req.url),
				i = parseInt(query.pathname.slice(1), 10),
				v = JSON.parse(query.search.slice(1)).val;
			if (isNaN(i)) {
				res.statusCode = 404;
				res.end('Invalid item id.');
			} else if (!items[i]) {
				res.statusCode = 404;
				res.end('Item not found.');
			} else {
				if (!v) {
					res.statusCode = 404;
					res.end('Value "val" is necessary.');
				} else {
					items[i] = val;
					res.end('Put OK!');
				}
			}
	}
}).listen(8000, function () {
	console.log('restful server start on 8000');
});
