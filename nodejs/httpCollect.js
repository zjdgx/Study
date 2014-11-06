/**
 * create on 2014/11/06 nhn
 *   node httpCollect.js "http://www.baidu.com"
 *    :__bl(Buffer List)__: npm install bl, response.pipe(bl(function(){...}));
 *      http: on("data",function..)在请求返回数据过大时会触发多次
 */
var http = require("http"), count = 1;

// solution 1
var bl = require("bl");
http.get(process.argv[2], function( response ){
	response.pipe(bl(function(err, data){
		if (err) {
			return console.log( err );
		}
		data = data.toString();
		console.log(data.length);
		console.log(data);
	}));
});

// solution 2
/*var html = "";
http.get(process.argv[2], function( response ){
	response.on("data",function( data ){
		html += data.toString();
	});
	response.on("end",function(){
		console.log(html.length);
		console.log(html);
	});
});*/