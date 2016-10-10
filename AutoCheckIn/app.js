/**
 * Build Date: 15/2/27 17:03.
 * Copyright (c): NHN China Co.,LTD
 * Author: ZJDGX
 * Description:
 */

var accounts = require('./config').accounts;
var task = require('./controller/task');
var autoCheckIn = require('./controller/autoCheckIn');

// 定时执行
task({h: [13], m: [32]}, function () {
	accounts.forEach(function (v) {
		autoCheckIn(v);
	});
});

console.log('======', '自动签到服务运行中..', '======');
