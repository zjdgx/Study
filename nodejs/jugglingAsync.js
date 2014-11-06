/**
 * create on 2014/11/06 nhn
 *   node jugglingAsync.js "http://www.baidu.com" "http://zhidao.baidu.com" "http://www.google.com.hk/?gws_rd=ssl"
 */
var http = require("http"), finished = 0, result = {};

function getHttp(url, index) {
	var resultData = "";
	http.get(url, function(response) {
		response.on("data",function( data ){
			resultData += data.toString();
		});
		response.on("err", function(err){
			result["index"+index] = err;
		});
		response.on("end", function(){
			result["index"+index] = resultData;
			++finished;
			if(finished == 3) {
				printResult();
			}
		});
	});
}

function printResult() {
	console.log(result["index0"]);
	console.log(result["index1"]);
	console.log(result["index2"]);
}
for(var i=0; i<3; i++) {
	getHttp(process.argv[2+i],i)
}