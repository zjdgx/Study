/**
 * learnyounode 6: make it module
 * create on 2014/11/06 nhn
 *   node fileFilterModuleTest.js "f:/projects/nodejs/" "txt"
 *   :__require__: fileFilterListModule
 */
var module = require("./fileFilterListModule.js");

module(process.argv[2],process.argv[3],function(err, list){
	if(err) {//error
		return console.error( err );
	}
	list.forEach(function(file){
		console.log(file);
	});
});
