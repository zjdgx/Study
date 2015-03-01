var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

app.listen(8000, function(){
	console.log('lesson16-cookie-session started on port 8000...');
});

app.use(cookieParser());
app.get('/', function(req, res) {
	// 如果请求中的cookie存在isVisit, 则输出cookie
	// 否则, 设置cookie字段isVisit, 并设置过期时间1分钟
	if (req.cookies.isVisit) {
		console.log(req.cookies);
		res.send('欢迎再次访问...');
	} else {
		res.cookie('isVisit', 1, {maxAge: 60*1000});
		res.send('欢迎第一次访问...');
	}
});