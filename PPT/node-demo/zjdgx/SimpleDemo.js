/**
 * Created by zjdgx on 2014/12/11.
 */

var http = require('http');

http.createServer(function(req,res){
	res.end('Hello world!');
}).listen(8000, function () {
	console.log('Nodejs server start on port: 8000...');
})
