/**
 * Build Date: 15/2/27 17:08.
 * Copyright (c): NHN China Co.,LTD
 * Author: ZJDGX
 * Description:
 */
var later = require('later');

/**
 * 定时任务
 * @param time 参考later的base time
 * @param intervalFn 定时执行的函数
 */
module.exports = function (time, intervalFn) {
	var sched = {schedules: [time]};

	// 设定为本地时间
	later.date.localTime();
	later.setInterval(intervalFn, sched);
};
