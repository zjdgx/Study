var fs = require('fs'),
	express = require('express'),
	bodyparser = require('body-parser'),
	path = require('path'),
	config = require('./config'),
	morgan = require('morgan'),
	zjdgxFile = require('./lib/file/zjdgxFile'),
	app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyparser.urlencoded({
	extended: true
}));

app.get('/', function (req, res) {
	res.render('index.jade', {
		title: 'zjdgx file upload demo',
		menus: {'百度': 'http://www.baidu.com', 'Homepage': 'http://zjdgx.github.io', '网易': 'http://www.163.com'},
		date: '2015-02-27'
	});
});
require('./config/routeConfig').dispatch(app);

app.listen(config.server.port, function () {
	console.log('uploadFile starts on port ' + config.server.port);
});