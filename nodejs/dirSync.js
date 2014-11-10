/**
 * learnyounode 5: filtered js
 * create on 2014/11/06 nhn
 *   node file.js "f:/projects/nodejs/dirSync.js" "txt"
 */
var fs = require("fs"), path = require("path"), extname = process.argv[3];
fs.readdir(process.argv[2],function(err,files){
	for(var i=0,len=files.length; i<len; i++) {
		if(path.extname(files[i])==="."+extname) {
			console.log(files[i]);
		}
	}
});