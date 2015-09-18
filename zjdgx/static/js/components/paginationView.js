/**
 * Build Date: 15/9/17 8:31.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

define(['backbone', 'jquery', './templates', './paginationModel'], function (Backbone, $, templates, PaginationModel) {
	return Backbone.View.extend({
		el: 'pagination',
		template: templates.paginationViewTemplate,
		model: new PaginationModel(),
		initialize: function (opts) {
			this.model.set(opts);
		},
		render: function () {
			this.$el.append(this.template(this.model.toJSON()));
		}
	});
});