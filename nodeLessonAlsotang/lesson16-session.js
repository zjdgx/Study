var express = require('express');
var session = require('express-session');
var app = express();

app.listen(8000, function(){
	console.log('lesson16-cookie-session started on port 8000...');
});

app.use(session({
	secret: 'recommand 128 bytes random string',// 建议使用128个字符的随机字符串
	cookie: {maxAge: 60 * 1000}
}));

app.get('/', function(req, res){
	// 检查session中的isVisit字段
	// 如果存在则增加一次, 否则为session设置isVisit字段, 并初始化为1
	if (req.session.isVisit) {
		req.session.isVisit++;
		res.send('<p>第' + req.session.isVisit + '次来此页面...');
	} else {
		req.session.isVisit = 1;
		res.end('欢迎第一次来这里...');
		console.log(req.session);
	}
});