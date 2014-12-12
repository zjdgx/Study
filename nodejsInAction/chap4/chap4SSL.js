/**
 * Created by zjdgx on 2014/12/12 17:50.
 */

var https = require('https'),
	fs = require('fs');

var options = {
	key: fs.readFileSync('./zjdgx.key.pem'),
	cert: fs.readFileSync('./zjdgx.key-cert.pem')
};

https.createServer(function (req, res) {
	res.writeHead(200);
	res.end('Hello Wolrd. Generate by HTTPS...');
}).listen(8000, function () {
	console.log('chap4: ssl server start on port 8000');
});