/**
 * Build Date: 15/8/18 14:46.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

define(['backbone'], function (Backbone) {
	return Backbone.Model.extend({
		defaults: {
			name: '',
			email: '',
			phone: '',
			password: ''
		},
		url: function () {
			return '/register';
		}
	});
});