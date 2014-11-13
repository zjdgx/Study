/**
 * expressworks 7: WHAT'S IN QUERY
 *  create on 2014/11/11 nhn
 *   node queryString.js 8000
 */

var express = require("express"),
    url = require("url"),
    app = express();

app.get("/search", function(req, res) {
    var data = url.parse(req.url, {encoded: "utf8"});
    res.send(JSON.stringify(data.query));
});

app.listen(Number(process.argv[2]));