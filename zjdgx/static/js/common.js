/**
 * Build Date: 15/8/4 13:31.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

define(['jquery', 'underscore', 'backbone', 'handlebars'], function ($, _, Backbone) {
	var zjdgx = {};

	zjdgx.loadMain = function () {
	};

	zjdgx.loadTeacher = function () {
		require(['teacher/teacherView'], function (TeacherView) {
			new TeacherView().render();
		});
	};

	return zjdgx;
});