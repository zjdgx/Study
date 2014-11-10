/**
 * Nodejs多核处理模块cluster
 *  url: http://blog.fens.me/nodejs-core-cluster/
 * 
 */
var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
	// process.env.NODE_UNIQUE_ID: undefined
	console.log("master start： "+process.env.NODE_UNIQUE_ID);

	// Fork workers.
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('listening', function(worker, address) {
		console.log('listening: worker ' + worker.process.pid + ', Address: '
				+ address.address + ":" + address.port);
	});

	cluster.on('exit', function(worker, code, signal) {
		console.log('worker ' + worker.process.pid + ' died');
	});
} else {
	http.createServer(function(req, res) {
		console.log("master start： "+process.env.NODE_UNIQUE_ID);
		res.writeHead(200);
		res.end("hello world\n");
	}).listen(0);
}