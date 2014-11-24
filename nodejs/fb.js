// 斐波拉切数列测试

var moment = require("moment"),
	start = moment(),
	result = 0;

function fb( n ) {
	if( n == 0 || n == 1 ) {
		return 1;
	} else {
		return fb(n-1)+fb(n-2);
	}
}
result = fb(40);
console.log("time: "+(moment()-start)+", result: "+result);