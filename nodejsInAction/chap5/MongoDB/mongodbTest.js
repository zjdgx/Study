// (1).连接MongoDB
var mongodb = require('mongodb'),
	server = new mongodb.Server('127.0.0.1', 27017, {}),
	client = new mongodb.Db('zjdgx-nodejs-in-action-test', server, {w: 1});
	
client.open(function(err){
	if (err) throw err;
	
	// (2).访问MongoDB集合
	client.collection('mongodb.test.chap5.3', function(err, collection) {
		if (err) throw err;
		
		// (3).将文档插入集合中
		/*collection.insert(
			{'title':'I like cake', 'body':'It is quite good.'},
			{safe: true},
			function (err, documents) {
				if (err) throw err;
				
				console.log('Document ID is: ' + documents[0]._id);
			}
		);
	
		// (4).用文档ID更新数据
		var _id = new client.bson_serializer.ObjectID('54a9f108785bc9dc0d61d9c0');
			
		collection.update(
			{_id: _id},
			{$set: {'title':'I ate too much cake.'}},
			{safe: true},
			function (err) {
				if (err) throw err;
			}
		);
		
		// (5).搜索文档
		collection.find({'body':'It is quite good.'}).toArray(function(err, results){
			if (err) throw err;
			
			console.log(results);
		});*/
		
		// (6).删除文档
		var _id = new client.bson_serializer.ObjectID('54a9ecf3f26bfc9c14457130');
			
		collection.remove({_id:_id}, {safe: true}, function (err) {
			debugger;
			if (err) throw err;
			
			console.log('Document ID('+_id+') is deleted successfully.');
		});
	});
});