/**
 * Created by zjdgx on 2014/12/12.
 */

var http = require('http'),
	parse = require('url').parse,
	join = require('path').join,
	fs = require('fs'),
	root = __dirname;

http.createServer(function (req, res) {
	var url = parse(req.url),
		path = join(root, url.pathname);

	fs.stat(path, function (err, stat) {
		if (err) {
			if ('ENOENT' == err.code) {
				res.statusCode = 404;
				res.end('File not found.');
			} else {
				res.statusCode = 500;
				res.end('Internal server error.');
			}
		} else {
			var stream = fs.createReadStream(path, {encoding: 'utf8'});

			res.setHeader('Content-Length', stat.size);
			stream.pipe(res);

			stream.on('error', function (err) {
				res.statusCode = 500;
				res.end('Internal server error.');
			});
		}
	});
}).listen(8000, function () {
	console.log('chap4: static files server start on port 8000');
});