/**
 * Build Date: 15/8/3 16:08.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

var http = require('http'),
	express = require('express'),
	app = express(),
	route,
	cfg,
	preProcessors = [],
	bodyParser = require('body-parser'),
	routes = require('./config').routes,
	session = require('express-session'),
	compression = require('compression');


app.set('views', __dirname + '/view');
app.set('view engine', 'jade');

app.use(session({secret:'zjdgx20150803'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./static'));
app.use(compression());

app.get('/', function (req, res) {
	res.charset = 'utf-8';
	res.render('index.jade', {
		title: 'nodejs express session demo',
		message: 'nodejs express session demo',
		username: req.session.username,
		email: req.session.email
	});
});

var processReq = function(routeCfg, processor) {
	return function(req, res, next) {
		for ( var i = 0, length = preProcessors.length; i < length; i++) {
			preProcessors[i](req, res, next, routeCfg);
		}

		processor(req, res, next);
	};
};

for (var i = 0; i < routes.length; ++i) {
	cfg = routes[i];
	route = require(cfg.path);
	app[cfg.method](cfg.url, processReq(cfg, route[cfg.objName]));
}

app.listen(8000);