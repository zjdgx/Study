/**
 * Created by nhn on 2014/12/5.
 */

var http = require("http"),
    connect = require("connect");

function logger(req, res, next) {
    console.log("%s %s", req.method, req.url);
    next();
}

connect().use(
    connect.static(__dirname + "../static", {maxAge: 60 * 60 * 1000, hidden: false})
).use(function (req, res, next) {
        res.setHeader('Content-Type', 'text/html');
        res.setHeader("Set-Cookie", ["author=zjdgx"]);
        //  res.write("end connect: zjdgx function finished....");
        // console.log("next....");
        //next();
}).use(function (req, res) {
    res.end("connect middleware zjdgx function with send.\n");
}).listen(8000);