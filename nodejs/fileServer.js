/**
 * create on 2014/11/07 nhn
 *   node fileServer.js 8000 "F:/zjdgx/Study/nodejs/sa.txt"
 *    file server: response.writeHead(200,{"content-type":"text/plain"})
 *		the second parameter must be a native file, can't be url.
 *		the file must encoded by utf8
 */
var http = require("http"),
	fs = require("fs");

var server = http.createServer(function(req, res) {
	res.writeHead(200, { 'content-type': 'text/plain' });
	var data = fs.createReadStream(process.argv[3],{encoding:"utf8"});
	data.pipe(res);
	console.log("finished");
});

server.listen(Number(process.argv[2]));