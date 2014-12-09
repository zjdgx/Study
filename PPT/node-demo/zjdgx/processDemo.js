/**
 * Created by nhn on 2014/12/9.
 */

var str = "",
	fs = require("fs");

process.stdin.setEncoding('utf8');

process.stdin.on('readable', function () {
	var chunk = process.stdin.read();
	if (chunk !== null) {
		str += chunk;
		process.stdout.write('data: ' + chunk);
	}
});

process.stdin.on('end', function () {
	fs.write('zjdgx.process.log',str,function(err){
		console.log("file write failed...");
	});
	process.stdout.write('end');
});

process.on('SIGINT', function () {
	console.log("process exit...");
});