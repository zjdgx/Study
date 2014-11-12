var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  require('os').cpus().forEach(function(){
    cluster.fork();
  });
  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
  cluster.on('listening', function(worker, address) {  
    console.log("A worker with #"+worker.id+" is now connected to " +
     address.address +
    ":" + address.port);  
  }); 
} else {
  http.createServer(function(req, res) {
    console.log('Worker #' + cluster.worker.id + ' has a request');
    res.writeHead(200);
    console.time('Time');
    function sleep(milliSeconds) {
      var startTime = new Date().getTime();
      while (new Date().getTime() < startTime + milliSeconds);
    }
    sleep(5000);
    res.end("hello world\n");
    console.log('Worker #' + cluster.worker.id + ' make a response');
    console.timeEnd('Time');
  }).listen(8000);
}