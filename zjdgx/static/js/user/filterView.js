/**
 * Build Date: 15/11/2 15:08.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

define(['jquery', 'backbone', './filterModel', './templates'], function ($, Backbone, filterModel, templates) {
	return Backbone.View.extend({
		model: new filterModel(),
		template: templates.filterViewTemplate,
		events: {

		},
		initialize: function () {

		},
		render: function () {

		}
	});
});