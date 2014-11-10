/**
 * learnyounode 3: my first IO
 * create on 2014/11/06 nhn
 *   node file.js "f:/projects/nodejs/baby.js"
 */
var fs = require("fs");
var data = fs.readFileSync(process.argv[2]);
var lines = data.toString().split('\n').length - 1;
console.log(lines);