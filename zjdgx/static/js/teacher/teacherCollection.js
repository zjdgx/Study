/**
 * Build Date: 15/9/15 11:18.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

define(['backbone', './teacherModel'], function (Backbone, TeacherModel) {
	return Backbone.Collection.extend({
		model: TeacherModel,
		url: function () {
			return '/teacherlist';
		}
	});
});