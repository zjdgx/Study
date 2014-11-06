/**
 * create on 2014/11/06 nhn
 *   node file.js "f:/projects/nodejs/baby.js"
 */
var fs = require("fs"), fileName = process.argv[2];
function callback(err, data) {
	if(!err) {
		console.log(data.toString().split("\n").length-1);
	}
}
fs.readFile(fileName,callback);
