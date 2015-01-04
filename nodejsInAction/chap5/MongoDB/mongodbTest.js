
var mongodb = require('mongodb'),
	server = new mongodb.Server('127.0.0.1', 27017, {}),
	client = new mongodb.Db('zjdgx-nodejs-in-action-test', server, {w: 1});
	
client.open(function(err){
	if (err) throw err;
	
	client.collection('mongodb.test.chap5.3', function(err, collection) {
		if (err) throw err;
		
		console.log('We are now able to perform queries...');
	});
});