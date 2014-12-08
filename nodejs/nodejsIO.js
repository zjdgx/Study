/**
 * Created by zjdgx on 2014/12/2.
 *  nodejs io test
 */

var fs = require('fs'),
    url = require('url'),
    filename = "./f.txt",
    http = require("http"),
    htmlSource = "http://zjdgx.github.io/address.html",
    imgSource = "http://g-ec4.images-amazon.com/images/G/28/gno/sprites/global-sprite-v1._V339353346_.png";

/*http.createServer(function (req, res) {
    var json = url.parse(req.url, true),
        start = new Date().getTime(),
        pn = json.pathname;

    getFileData(pn, function (data) {
        if (pn.indexOf("url") > -1) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('<html><head><title>zjdgx</title><head><body><span>time: '
                + (new Date().getTime() - start) + 'ms</span><br>');
            if (pn.indexOf("url_sync") > -1) {
                fs.writeFile("./baidulogo.png", data, "binary", function (err) {
                    if (err) {
                        res.end("download fail...");
                    }
                    res.end("download success...");
                });
                res.write('<img src="data:image/jpeg;base64,');
                res.write(new Buffer(data, "binary").toString('base64') + '"/>');
            } else {
                res.write("<span>html character number: " + data.length + "</span>");
            }
            res.end('</body></html>');
        } else {
            res.end("pathname: " + pn + ", time:" + (new Date().getTime() - start)
                + "\n\ncharacter number: " + data.length, 'utf8');
        }
    });
}).listen(8080);

function getFileData(type, callback) {
    if (type === '/file_sync') {
        callback(fs.readFileSync(filename, {encoding: "utf8"}).toString());
    } else if (type === '/file_async') {
        fs.readFile("./f.txt", {encoding: "utf8"}, function (err, data) {
            if (err)
                throw err;

            callback(data.toString());
        });
    } else if (type === '/url_sync') {
        var html = "";

        http.get(imgSource, function (res) {
            res.setEncoding("binary");//encoding is nessesary...
            res.on("data", function (data) {
                html += data;
            });
            res.on("end", function () {
                callback(html);
            });
        });
    } else if (type === '/url_async') {
        var html = "";

        http.get(htmlSource, function (res) {
            res.on("data", function (data) {
                html += data.toString();
            });
            res.on("end", function () {
                callback(html);
            });
        });
    }
}*/

fs.link("./jade/urlSource.jade", "f://urlSource.jade", function(err){
    if(err) {
        console.log("link error: "+err);
    }
    console.log("link success...");
});
fs.linkSync("./jade/urlSource.jade", "f://urlSource-sync.jade", function(err){
    //TODO: never executed
    console.log("linksync success...");
    if(err) {
        console.log("linksync error: "+err);
    }
});