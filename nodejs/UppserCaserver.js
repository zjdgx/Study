/**
 * create on 2014/11/07 nhn
 *   node UppserCaserver.js 8000
 *    :__req.pipe__: 
 *		through2-map: translate stream to string
 */
var map = require("through2-map"),
	http = require("http"),
	fs = require("fs");

var server = http.createServer(function(req,res){
	/*var data = fs.createReadStream(process.argv[3],{encoding:"utf8"});
	data.pipe(map(function(chunk){
		return chunk.toString().toUpperCase();
	})).pipe(res);*/
	
	if (req.method != 'POST')
		return res.end('send me a POST\n');

	req.pipe(map(function (chunk) {
		return chunk.toString().toUpperCase();
	})).pipe(res);
});

server.listen(Number(process.argv[2]));