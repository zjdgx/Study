/**
 * expressworks 2: jade create on 2014/11/10 nhn node jade.js 8000 set view
 * template path(only path): app.set("views", path.join("./","")); set view
 * engine for node: app.set("view engine", "jade");
 */

/*var express = require("express"), bodyParser = require("body-parser"), app = express();

app.use(bodyParser.urlencoded({
	extended : false
}));

app.post("/form", function(req, res) {
	res.send(req.body.str.split("").reverse().join(""));
});

app.listen(Number(process.argv[2]));*/

var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.urlencoded({extended: false}))

app.post('/form', function(req, res) {
	console.log(req.body);
  res.send(req.body.str.split('').reverse().join(''))
})

app.listen(process.argv[2])