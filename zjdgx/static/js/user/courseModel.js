/**
 * Build Date: 15/10/22 15:54.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

define(['backbone'], function (Backbone) {
	return Backbone.Model.extend({
		defaults: {
			grade: '-1',
			gradeValue: '请选择',
			class: '-1',
			className: '请选择',
			subject: '-1',
			subjectValue: '请选择',
			notes: '',
			location: '',
			address: '',
			mapPosition: '',
			contact: '',
			phone: '',
			noteChecked: true
		},
		url: function () {
			return '/courses';
		},
		validate: function (attrs) {
			console.log(JSON.stringify(attrs));
		}
	});
});