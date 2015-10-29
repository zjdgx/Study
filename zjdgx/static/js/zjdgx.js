/**
 * Build Date: 15/8/4 13:31.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

define(['jquery', 'underscore', 'backbone', 'handlebars'], function ($, _, Backbone) {
	var zjdgx = {};

	zjdgx.init = function () {
		this.eventbus = _.extend({}, Backbone.Events);
	};

	zjdgx.loadMain = function () {
		require(['common/MainView'], function (MainView) {
			new MainView().render();
		});
	};

	zjdgx.loadTeacher = function () {
		this.init();
		require(['user/HeaderView', 'teacher/teacherView'], function (HeaderView, TeacherView) {
			new HeaderView();
			new TeacherView().render();
		});
	};

	zjdgx.alert = function (opts) {
		require(['components/alertView'], function (AlertView) {
			new AlertView().render(opts);
		});
	};

	zjdgx.updatePortrait = function (result) {
		if (result.status) {
			this.eventbus.trigger('uploadSuccess:portrait', result.file);
		} else {
			require(['components/alertView'], function (AlertView) {
				new AlertView().render('头像上传错误');
			});
		}
	};

	zjdgx.loadNewCourse = function () {
		require(['user/newCourseView'], function (NewCourseView) {
			new NewCourseView().render();
		});
	};

	return zjdgx;
});