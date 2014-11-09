/**
 * create on 2014/11/07 nhn
 *   node timeServer.js 8000
 *		url.parse(req.url, true)
 *		JSON.stringify: translate JSON to json string
 */
var url = require("url"),
	http = require("http");
	
var server = http.createServer(function (req, res) {
	var json = url.parse(req.url, true), time = {}, date = new Date(json.query.iso);
	if (json.pathname === "/api/parsetime") {
		time["hour"] = date.getHours();
		time["minute"] = date.getMinutes();
		time["second"] = date.getSeconds();
		return res.end(JSON.stringify(time));
	}
	if (json.pathname === "/api/unixtime") {
		res.end(JSON.stringify({"unixtime":date.getTime()}));
	}
});

server.listen(Number(process.argv[2]));