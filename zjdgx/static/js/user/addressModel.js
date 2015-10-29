/**
 * Build Date: 15/10/24 14:13.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

define(['jquery', 'backbone'], function ($, Backbone) {
	return Backbone.Model.extend({
		defaults: {
			level: 4,
			id: 1930
		},
		url: function () {
			var result = '',
					level = this.get('level');

			if (level == 4) {
				result = '/countyList';
			} else if (level == 5) {
				result = '/townList';
			}

			return result;
		}
	});
});