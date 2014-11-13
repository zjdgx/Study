/**
 * expressworks 2: jade
 *  create on 2014/11/10 nhn
 *   node jade.js 8000
 *     set view template path(only path):
 *     	app.set("views", path.join("./",""));
 *     set view engine for node:
 *     	app.set("view engine", "jade");
 */

var express = require("express"), path = require("path"), app = express();
app.set("views", path.join("../static/template",""));
app.set("view engine", "jade");
//app.engine("jade",require("jade").__express);
//TODO:Error: No default engine was specified and no extension was provided.
app.get("/home", function(req, res) {
	res.render("index", {
		date : new Date().toDateString()
	});
});

app.listen(Number(process.argv[2]))
