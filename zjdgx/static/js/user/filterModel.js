/**
 * Build Date: 15/11/2 15:11.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

define(['jquery', 'backbone'], function ($, Backbone) {
	return Backbone.Model.extend({
		defaults: {
			cityId: -1,
			subjectId: -1,
			school: '',
			type: -1,
			sex: -1
		},
		url: function () {
			return '/getFilter';
		}
	});
});