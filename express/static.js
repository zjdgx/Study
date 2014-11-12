/**
 * Created by nhn on 2014/11/11.
 */

var express = require("express"),
    path = require("path"),
    app = express();

app.use(express.static(process.argv[3]||path.join("../static/","")));

app.listen(Number(process.argv[2]));