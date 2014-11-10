/**
 * expressworks 1: hello
 * create on 2014/11/10 nhn
 *   node hello.js 8000
 */
var express = require("express"),
	app = express();

app.get("/",function(req, res){
	res.end("Hello 333 world!\n");
});

app.listen(Number(process.argv[2]));