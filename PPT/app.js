/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express.createServer();
var error = require('./common/ErrorHandler');
var logger = require("./utils/log_util.js").getLogger('App.js');
var auth = require("./authorization/auth_controller.js");
var i18n = require('i18n');
var navigation = require("./common/navigation.js");
var requestLog = require("./common/request_log.js");
var project_service = require("./project/project_service.js");
var conf = require('./utils/config_util.js');
var redis = require('redis').createClient(conf.redis.port, conf.redis.host);
var RedisStore = require('connect-redis')(express);
var cluster = require('cluster');
var querySizeLimit = require('./open_api/query_size_limit');
var acl = require('./permissions/acl');

if (cluster.isMaster && !module.parent.parent) {
	for (var i = 0; i < conf.workers; ++i) {
		cluster.fork();
	}

	cluster.on('online', function (worker, code, signal) {
		logger.info('Worker ' + worker.process.pid + ' Online');
	});

	cluster.on('exit', function (worker, code, signal) {
		var exitCode = worker.process.exitCode;

		logger.info('worker ' + worker.process.pid + ' died ('+exitCode+'). restarting...');
		cluster.fork();
	});

	var cronjobs;

	function setupCronJobs(code, signal) {
		if (cronjobs) {
			logger.info('cron process ' + cronjobs.pid + ' is dead with signal: ' + signal);
			logger.info('try to restart cron process');
		}

		cronjobs = require('child_process').fork(__dirname + '/utils/cron_jobs.js');
		cronjobs.on('exit', setupCronJobs);
	}

	setupCronJobs();
} else {
	var access_logfile = require('fs').createWriteStream(conf.logging.access, {flags: 'a'}),
			i18n_config = require('./i18n_config');

	project_service.cacheProjectsLogLimits();

	// Configuration
	app.configure(function () {
		app.use(express.logger({stream: access_logfile }));
		app.set('views', __dirname + '/../views');
		app.set('view engine', 'jade');
		app.use(express.compress());
		app.use(express.bodyParser());
		// use cookie and session
		app.use(express.cookieParser());
		app.use(express.session({
			secret : "do you think you can find out what sentence I will use? I think it's hard for you to do so!",
			// set session timeout
			cookie : {
				path : '/',
				httpOnly : true,
				maxAge : conf.sessionTimeOut
			},
			store: new RedisStore({"client": redis})
		}));
		app.use(express.methodOverride());
		app.use(i18n.init);
		app.use(i18n_config.init);

		app.use(querySizeLimit.check);

		app.use(express.static(__dirname + '/../static'));
		app.use('/download', express.static(conf.download.path));
		app.use('/docs', express.static(__dirname + '/../docs'));
		app.use(acl.middleware);
		app.use(app.router);
	});

	// Init routes
	require('./open_dispatch.js').dispatch(app);

	// setup dynamic helpers for view rendering
	app.dynamicHelpers({
		request : function (req, res) {
			return req;
		},
		response: function (req, res) {
			return res;
		},
		session: function (req, res) {
			return req.session;
		},
		currentUser: function (req,res) {
			return req.session ? req.session.user : null;
		}
	});

	app.configure('development', function () {
		app.use(error({
			showMessage : true,
			dumpExceptions : true,
			showStack : true
		}));
	});

	app.configure('production', function () {
		app.use(error());
	});

	// Init routes
	var rDes = require('./dispatch.js');
	rDes.setupPreProcessor(navigation.navGen);
	rDes.setupPreProcessor(requestLog.listen);
	rDes.dispatch(app);

	// `module` is the current /lib/app.js script.
	// `module.parent` is its parent /index.js script.
	// `module.parent.parent` can be `undefined` if Webapp was started via `node app`.
	// Otherwise, it is defined as one of the test modules in /test directory.
	// That is when requiring `index.js` within the the test script, this /lib/app.js
	// should not start listening because the test script may want to set its own
	// custom port to listen to.
	// Thus, listen to a port defined in the configuration file only if the app
	// is not required from a test script.
	if (!module.parent.parent) {
		app.listen(conf.port, function () {
			console.log("Business server listening on port %d in %s mode", app.address().port, app.settings.env);
		});
	}
}
