/**
 * Created by nhn on 2014/12/2.
 */


/*var fs = require('fs'),
 util = require('util'),
 _zjdgx_spline_ = "\n------------------------------------------\n";

 //1. 同步读文件
 console.log("\treadFileSync start" + _zjdgx_spline_ + fs.readFileSync("./f.txt", {encoding: "utf8"}).toString() + "\n");

 //2. 异步读文件
 fs.readFile("./f.txt", function (err, data) {
 if (err)
 throw err;
 console.log("\treadFile start" + _zjdgx_spline_ + data.toString());
 });*/

var fs = require('fs'),
    url = require('url'),
    filename = "./f.txt",
    http = require("http"),
    urlresource = "http://www.baidu.com/img/bdlogo.png";

var server = http.createServer(function (req, res) {
    var json = url.parse(req.url, true),
        start = new Date().getTime(),
        pn = json.pathname;

    getFileData(pn, function (data) {
        if( pn.indexOf("url") > -1 ) {
            console.log(1234);
            res.writeHead(200, {"Content-Type": "image/png"});
            res.write(data, "binary");
            res.end();
        } else {
            res.end("pathname: " + pn + ", time:" + (new Date().getTime() - start) + "\n\n" + data, 'utf8');
        }
    });
}).listen(8000);


function getFileData(type, callback) {
    if (type === 'file_sync') {
        callback(fs.readFileSync(filename, {encoding: "utf8"}).toString());
    } else if (type === 'file_async') {
        fs.readFile("./f.txt", {encoding: "utf8"}, function (err, data) {
            if (err)
                throw err;
            callback(data.toString());
        });
    } else if (type === 'url_sync') {
        var html = "";
        var req = http.get(urlresource);
        req.on('response', function(res) {
            var type = res.headers["content-type"],
                body = "";
            res.setEncoding('binary');
            res.on("data",function( data ){
                html += data;
            });
            res.on("end",function(){
                callback(html);
            });
        });
        console.log("url_sync finished....");
    } else if (type === 'url_async') {

    }
}