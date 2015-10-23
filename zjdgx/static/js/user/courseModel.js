/**
 * Build Date: 15/10/22 15:54.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

define(['backbone'], function (Backbone) {
	return Backbone.Model.extend({
		defaults: {

		},
		url: function () {
			return '/courses';
		}
	});
});