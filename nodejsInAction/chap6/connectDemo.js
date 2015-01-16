/**
 * Created by nhn on 2014/12/5.
 */

var connect = require("connect"),
    app = connect();

/*function logger(req, res, next) {
    console.log("%s %s", req.method, req.url);
    next();
}

function hello(req, res) {
    res.setHeader('Content-type', 'text/plain');
    res.setHeader('Set-cookie', 'author:zjdgx');
    res.end('hello world.');
}

function redirect(req, res, next) {
    var auth = req.headers.authorization;
	
	console.log('redirect req.url: '+req.url);

    if (!auth) {
		return next(new Error('Unauthorized.'));
	} else {
		next();
	}

    var parts = auth.split(' '),
        scheme = parts[0],
        aut = new Buffer(parts[1], 'base64').toString().split(':'),
        user = aut[0],
        pass = aut[1];

    authenticateWithDatabase(user, pass, function (err) {
        if (err) return next(err);

        next();
    })
}

function admin(req, res, next) {
	
	console.log('admin req.url: '+req.url);
	
    switch (req.url) {
        case '/':
            res.end('try/users');
            break;
        case '/users':
            res.setHeader('Content-Type', 'application/json');
			console.log('/users visited....');
            res.end(JSON.stringify(['tobi', 'loki', 'jane']));
            break;
    }
}

app.use(logger).use('/admin', redirect).use('/admin', admin).use(hello).listen(8000);*/

// 挂载'/admin': 访问时路径为host/admin/users, req.url显示为/users

/*
// -------------------------------------------------------
// date: 2015/01/06
// 6.4.2 显示管理面板的中间件
function blog (req, res, next) {
	res.setHeader('Content-type', 'text/plain');
    res.setHeader('Set-cookie', 'author:zjdgx');
    res.end('hello world.');
}

app.use('/blog', blog).use('/zjdgx', blog).listen(8000);
//ZJDGX(2015/01/06): 访问/blog与/zjdgx返回的结果一样
// -------------------------------------------------------

// -------------------------------------------------------
// date: 2015/01/06
// 6.5.1 创建可配置的logger中间件组件(P119)
function setup (format) {
	var regexp = /:(\w+)/g;
	
	return function logger (req, res, next) {
		var str = format.replace(regexp, function (match, property) {
			return req[property];
		});
		
		console.log(str);
		
		next();
	}
}
module.exports = setup;
// -------------------------------------------------------

// -------------------------------------------------------
// date: 2015/01/08
// 6.5.2 构建路由中间件组件(P120)
var router = require('./middleware/router');

var routes = {
	GET: {
		'/users' : function(req, res) {
			res.end('tobi, loki, ferret');
		},
		'/users/:id' : function(req, res, id) {
			res.end('user ' + id);
		}
	},
	DELETE: {
		'/users/:id' : function(req, res, id) {
			res.end('delete user ' + id);
		}
	}
}
app.use(router(routes)).listen(8000);
// -------------------------------------------------------
*/

// -------------------------------------------------------
// date: 2015/01/08
// 6.5.3 构建一个重写URL的中间件组件(P122)
/*var path = require('./middleware/router');

var routes = {
	GET: {
		'/users' : function(req, res) {
			res.end('tobi, loki, ferret');
		},
		'/users/:id' : function(req, res, id) {
			res.end('user ' + id);
		}
	},
	DELETE: {
		'/users/:id' : function(req, res, id) {
			res.end('delete user ' + id);
		}
	}
}
app.use(router(routes)).listen(8000);*/
// -------------------------------------------------------

console.log('ConnectDemo started on port 8000....');


/*.use(logger).use(function (req, res, next) {
 res.setHeader('Content-Type', 'text/html');
 res.setHeader("Set-Cookie", ["author=zjdgx"]);
 //  res.write("end connect: zjdgx function finished....");
 // console.log("next....");
 //next();
 }).use(function (req, res) {
 res.end("connect middleware zjdgx function with send.\n");
 }).listen(8000);

 */