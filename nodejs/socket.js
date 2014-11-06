/**
 * create on 2014/11/06 nhn
 *   node socket.js 3000
 *    :__net__: net.createServer(function(socket){...}).listen(Number(process.argv[2])).
 *		socket.end(data)
 */
var net = require("net");

function formatNumber( num ) {
	return (num > 9) ? ""+num : "0"+num;
}

var server = net.createServer(function (socket) {
	var date = new Date(), str = "";
	str += date.getFullYear()+"-";
	str += formatNumber(date.getMonth()+1)+"-";
	str += formatNumber(date.getDate());
	str += " "+formatNumber(date.getHours());
	str += ":"+formatNumber(date.getMinutes());
	socket.end( str+"\n" );
});

server.listen(Number(process.argv[2]));