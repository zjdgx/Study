/**
 * Build Date: 16/2/4 10:49.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

var express = require('express'),
		app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
	res.render('test.jade');
});

// express session
app.use(session({
	secret: 'zjdgx redis session',
	name: 'zjdgx redis session demo',
	resave: true,
	saveUninitialized: true,
	cookie: {
		path: '/',
		httpOnly: true,
		maxAge: 24 * 60 * 60 * 1000
	},
	store: new RedisStore({
		client: redisClient
	})
}));

app.listen(8000, function () {
	console.log('zjdgx redis express session demo listening on port 8000');
});