/**
 * Build Date: 15/8/4 13:31.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

define(['jquery', 'underscore', 'backbone', 'handlebars'], function ($, _, Backbone) {
	var zjdgx = function () {
		this.eventbus = _.extend({}, Backbone.Events);
	};

	zjdgx.prototype.loadTeacher = function () {
		require(['teacher/teacherView'], function (TeacherView) {
			new TeacherView().render();
		});
	};

	zjdgx.prototype.alert = function (opts) {
		require(['components/alertView'], function (AlertView) {
			new AlertView().render(opts);
		});
	};

	zjdgx.prototype.updatePortrait = function (result) {
		if (result.status) {
			zjdgx.eventbus.trigger('uploadSuccess:portrait', result.file);
		} else {
			require(['components/alertView'], function (AlertView) {
				new AlertView().render('头像上传错误');
			});
		}
	};

	return zjdgx;
});