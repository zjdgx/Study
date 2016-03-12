/**
 * Build Date: 16/2/4 15:51.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */


//url: http://www.cnblogs.com/lori/p/3436090.html

var redis = require("redis");
var client = redis.createClient();

client.on("error", function (err) {
	console.log("Error " + err);
});

client.set("string key", "string val", redis.print);
client.hset("hash key", "hashtest 1", "some value", redis.print);
client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
client.hkeys("hash key", function (err, replies) {
	console.log(JSON.stringify(replies));
	console.log(replies.length + " replies:");
	replies.forEach(function (reply, i) {
		console.log("    " + i + ": " + reply);
	});
	client.quit();
});