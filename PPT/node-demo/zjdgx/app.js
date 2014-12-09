/**
 * Module dependencies.
 */
var express = require('express'),
		app = module.exports = express.createServer(),
		acl = require('./permissions/acl'),
		conf = require('./utils/config_util'),
		access_logfile = require('fs').createWriteStream(conf.logging.access, {flags: 'a'}),
		error = require('./common/ErrorHandler'),
		auth = require('./authorization/auth_controller'),
		i18n = require('i18n'),
		i18n_config = require('./i18n_config'),
		logger = require('./utils/nelo2_logger').getLogger('App.js'),
		menus = require('./permissions/menus_controller'),
		path = require('path'),
		querySizeLimit = require('./open_api/query_size_limit'),
		redis_pool = require('./utils/redis_pool'),
		RedisStore = require('connect-redis')(express);

redis_pool.acquire(function (err, redisClient) {
	if (err) {
		logger.error(err);
	} else {
		// Configuration
		app.configure(function () {
			app.set('views', path.join(__dirname, '..', 'views'));
			app.set('view engine', 'jade');

			app.use(express.logger({stream: access_logfile }));
			app.use(express.compress());
			app.use(express.static(path.join(__dirname, '..', 'static'), conf.static));
			app.use('/download', express.static(conf.download.path));
			app.use('/docs', express.static(path.join(__dirname, '..', 'docs')));

			app.use(express.bodyParser());
			// use cookie and session
			app.use(express.cookieParser());

			app.use(i18n.init);
			app.use(i18n_config.init);

			app.use(express.session({
				secret : "do you think you can find out what sentence I will use? I think it's hard for you to do so!",
				// set session timeout
				cookie : {
					path : '/',
					httpOnly : true,
					maxAge : conf.sessionTimeOut
				},
				store: new RedisStore({
					client: redisClient
				})
			}));

			app.use(express.methodOverride());
			app.use(querySizeLimit.check);

			app.use(acl.middleware);
			app.use(menus.middleware);
			app.use(app.router);
		});

		// Init routes
		require('./open_dispatch').dispatch(app);

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
		require('./dispatch').dispatch(app);
		//------------------------------------------------

		app.listen(conf.port, function () {
			console.log('NELO2 Webapp is listening on port %d in the %s mode', app.address().port, app.settings.env);
		});

		app.on('close', function () {
			console.log('Webapp has shutdown... Releasing resources...');

			redis_pool.release(redisClient);
		});
	}
});

// setup dynamic helpers for view rendering
app.dynamicHelpers({
	piwikConf: function () {
		return conf.piwik;
	},
	request : function (req) {
		return req;
	},
	response: function (req, res) {
		return res;
	},
	session: function (req) {
		return req.session;
	},
	userMenus: function (req) {
		// if user logout, session will be set to null. This will cause an exception on
		// render templates. So, we must check the session instance to avoid the foreseeable
		// error happen.
		var uid = !req.session ? 'NULL' : (
				req.session.user ? req.session.user.id : 'NULL'
				);
		return req['NELO2_MENU_' + uid] || '';
	},
	openApiConf: function () {
		var openApiConf = conf.openapi;

		return JSON.stringify({
			protocol: openApiConf.protocol,
			host: openApiConf.host,
			port: openApiConf.port
		});
	}
});
