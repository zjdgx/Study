/*
 * 使用connect实现的静态文件处理
 */
var connect = require('connect');
connect(connect.static(__dirname + '/public')).listen(
    3000,
    function() {
        console.log('Connect started on port 3000');
    }
);


/*
 * 使用node原生api实现
 */
var http = require('http');
http.createServer(
    function(req, res) {
        var url = require('url');
        var fs = require('fs');
        var pathname = __dirname + '/public' + url.parse(req.url).pathname;
		console.log(pathname);

        fs.readFile(
            pathname,
            function(err, data) {
                if (err) {
                    res.writeHead(500);
                    res.end('500');
                }
                else {
                    res.end(data);
                }
            }
        );
    }
).listen(
    3001,
    function() {
        console.log('http.Server started on port 3001');
    }
);

var express = require("express"),
	url = require('url'),
	app = express();
app.use(express.static(__dirname + '/public')).listen(3002, function(){
	console.log('Express started on port 3002');
});