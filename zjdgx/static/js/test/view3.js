/**
 * Build Date: 15/8/6 11:49.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

define(['jquery', 'backbone'], function ($, Backbone) {
	return Backbone.View.extend({
		className: 'view3',
		render: function () {
			this.$el.html('view3');

			return this;
		}
	});
});