/**
 * Nodejs多核处理模块cluster
 *  url: http://blog.fens.me/nodejs-core-cluster/
 * 
 */
var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;
console.log("isMaster:"+cluster.isMaster+", isWorker: "+cluster.isWorker+", Node_unique_id: "+process.env.NODE_UNIQUE_ID);
if (cluster.isMaster) {
	console.log("master start...");
	// Fork workers.
	for (var i = 0; i < numCPUs; i++) {
		console.log("fork start...");
		cluster.fork();
	}

	cluster.on('listening', function(worker, address) {
		console.log('listening: worker ' + worker.process.pid + ', Address: '
				+ address.address + ":" + address.port);
	});

	cluster.on('exit', function(worker, code, signal) {
		console.log('worker ' + worker.process.pid + ' died');
	});

	cluster.on('disconnect', function(worker) {
		console.log('The worker #' + worker.id + ' has disconnected');
	});

} else {
	console.log("worker starts....");
	http.createServer(function(req, res) {
		res.writeHead(200);
		res.end('Worker #' + cluster.worker.id + ' make a response.\n'+"hello world\n");
		cluster.worker.disconnect();
	}).listen(8000,function(){
		console.log("cluster demo started on port: 8000\n");
	});

	/*setTimeout(function(){
		cluster.worker.disconnect();
	},4000);*/
}