/**
 * expressworks 4: static
 *  set static file _path_!
 *  create on 2014/11/11 nhn
 *   node static.js 8000
 *    express.static(process.argv[3]||path.join("../static/",""))
 */
var express = require("express"),
    path = require("path"),
    app = express();

app.use(express.static(process.argv[3]||path.join("../static/","")));

app.listen(Number(process.argv[2]));