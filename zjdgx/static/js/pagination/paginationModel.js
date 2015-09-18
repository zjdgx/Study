/**
 * Build Date: 15/9/17 8:46.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

define(['backbone'], function (Backbone) {
	return Backbone.Model.extend({
		defaults: {
			curPage: 0,
			totalPage: 0
		},
		url: function () {
			return null;
		}
	});
});