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
/*
 //----------------------------------------------------------------------
 //1. readFile
 fs.readFile("./test/testfile.txt", {encoding: "utf8"}, function (err, data) {
 if (err)
 throw err;

 console.log("readFile: file size "+data.toString().length);
 });
 console.log("readFileSync: file size "+fs.readFileSync('./test/testfile.txt', {encoding: "utf8"}).toString().length);

 //----------------------------------------------------------------------
 //2. fs.link
 //TODO: link文件需要在同一个盘符下, 否则报错
 fs.link("./test/testfile1.txt", "./test/testfile-link.txt", function(err){
 if(err) {
 console.log("link error: "+err);
 }
 console.log("link success...");
 });
 fs.linkSync("./test/testfile1.txt", "./test/testfile-linkSync.txt", function(err){
 //TODO: never executed
 console.log("linksync success...");
 if(err) {
 console.log("linksync error: "+err);
 }
 });

 //----------------------------------------------------------------------
 //3. fs.rename
 fs.rename("./test/testfile1.txt",'./test/textfile-rename.txt', function(err) {
 if(err)
 console.log("rename file ./test/testfile1.txt error: "+err);
 });
 fs.renameSync("./test/testfile2.txt",'./test/testfile-renameSync.txt', function(err) {
 if(err)
 console.log("renameSync file ./test/testfile2.txt error: "+err);
 });

 //----------------------------------------------------------------------
 // 4. readdir, readdirSync
 fs.readdir("..", function (err, filenames) {
 var i;
 for (i = 0; i < filenames.length; i++) {
 console.log(filenames[i]);
 }
 });
 console.log("start...");
 var filenames = fs.readdirSync("..");
 for (i = 0; i < filenames.length; i++) {
 console.log(filenames[i]);
 }
 console.log("finish...");

 //----------------------------------------------------------------------
 // 5. truncate
 fs.truncate('./test/testfile.txt', 1000, function (err) {
 if (err) throw err;
 console.log('fd');
 });

//----------------------------------------------------------------------
// 6. stat
fs.stat('.', function (err, t) {
	console.log(JSON.stringify(t) + ",isDirectory: " + t.isDirectory());
});*/
//{"dev":0,"mode":16822,"nlink":1,"uid":0,"gid":0,"rdev":0,"ino":0,"size":0,"atime":"2014-12-09T01:13:38.000Z","mtime":"2014-12-09T01:13:38.000Z","ctime":"2014-12-04T00:45:40.000Z"}

process.stdin.setEncoding('utf8');
console.log("file operation start:");

process.stdin.on('readable', function () {
	var chunk = process.stdin.read();
	if (chunk !== null) {
		doFileOperation(chunk.toString());
	}
});

process.stdin.on('end', function () {
	process.stdout.write('end');
});

process.on('SIGINT', function () {
	console.log("process exit...");
});

function doFileOperation(type) {
	type = type.substring(1);
	if (type == 'readFile') {
		fs.readFile("./test/testfile.txt", {encoding: "utf8"}, function (err, data) {
			if (err)
				throw err;

			console.log("readFile: file size " + data.toString().length);
		});
		console.log("readFileSync: file size " + fs.readFileSync('./test/testfile.txt', {encoding: "utf8"}).toString().length);
	} else if (type == 'link') {
		console.log("link start...");
		fs.link("./test/testfile1.txt", "./test/testfile-link.txt", function (err) {
			if (err) {
				console.log("link error: " + err);
			}
			console.log("link success...");
		});
		fs.linkSync("./test/testfile1.txt", "./test/testfile-linkSync.txt", function (err) {
			console.log("linksync success...");
			if (err) {
				console.log("linksync error: " + err);
			}
		});
	}
}