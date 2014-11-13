/**
 * expressworks 7: WHAT'S IN QUERY
 *  create on 2014/11/11 nhn
 *   node json_me.js 8000 "f:/zjdgx/Study/express/book.txt"
 */

var express = require('express'),
    app = express(),
    fs = require('fs');

app.get('/books', function (req, res) {
    var filename = process.argv[3];
    fs.readFile(filename, {encoding:"utf8"}, function (e, data) {
        var books = "";
        if (e) return res.sendStatus(500);
        try {
            books = JSON.parse(data);
            console.log("try");
        } catch (e) {
            console.log("catch:"+e+", data: "+data);
            res.sendStatus(500);
        }
        res.json(books);
    })
});
app.listen(process.argv[2]);