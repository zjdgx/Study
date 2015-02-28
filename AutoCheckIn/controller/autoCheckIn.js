/**
 * Build Date: 15/2/27 17:08.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */
var request = require('superagent');
var sendEmail = require('./sendEmail');

var headers = {
	Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
	Origin: 'http://wap.17wo.cn',
	'X-FirePHP-Version': '0.0.6',
	'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36',
	'Content-Type': 'application/x-www-form-urlencoded',
	DNT: 1,
	Referer: 'http://wap.17wo.cn/Login.action',
	'Accept-Encoding': 'gzip, deflate',
	'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.6,en;q=0.4,sr;q=0.2'
};

var origin = 'http://17wo.cn',
	urls = {
		login: origin + '/Login!process.action',
		checkIn: origin + '/SignIn.action?checkIn=true'
	};


/**
 * 自动签到
 * @param account {object}
 * @constructor
 */
function AutoCheckIn(account) {
	this.account = account;

	this.cookie = {
		value: null,
		expires: null
	};

	this.init();
}

AutoCheckIn.prototype = {
	constructor: AutoCheckIn,

	init: function () {
		var that = this;

		that.checkIn(function () {
			sendEmail(that.account.user + '，签到完毕。 ' + new Date());
			console.log('======', '签到完毕，' + that.account.user, '======');
		});
	},

	// 验证登录，如果凭证没过期，无需重新验证
	_verify: function (cb) {
		Date.now() > this.cookie.expires ? this._login(cb) : cb(this.cookie);
	},

	// 登录
	_login: function (cb) {
		var that = this;

		request
			.post(urls.login)
			.set(headers)
			.type('form')
			.send({
				backurl: null,
				backurl2: null,
				chk: null,
				chkType: 'on',
				loginType: 0,
				mobile: that.account.user,
				password: that.account.password
			})
			.redirects(0) // 防止页面重定向
			.end(function (result) {
				var cookie = result.headers['set-cookie'];
				that.cookie = {
					value: cookie,
					expires: 3600000
				};

				cb(that.cookie);
			});
	},

	// 签到
	checkIn: function (cb) {
		var that = this;
		that._verify(function (cookie) {
			request
				.get(urls.checkIn)
				.set(headers)
				.set('Cookie', cookie.value)
				.end(cb);
		});
	}
};


module.exports = function (account) {
	return new AutoCheckIn(account);
};