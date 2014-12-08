/**
 * Created by zjdgx on 2014/12/3.
 *   https://github.com/alsotang/node-lessons/tree/master/lesson2
 *     visit: http://localhost:3000/?md5=1234
 */


var express = require("express"),
    utility = require("utility"),
    app = express();

app.get("/", function (req, res) {

    var q = req.query.md5;

    res.send(utility.md5(q));

}).listen(3000, function (req, res) {

    console.log("app is running on port 3000");

});

