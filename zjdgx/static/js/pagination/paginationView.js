/**
 * Build Date: 15/9/17 8:31.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

define(['backbone', 'jquery', 'pagination/templates', 'pagination/paginationModel'], function (Backbone, $, templates, PaginationModel) {
	return Backbone.View.extend({
		el: '.pagination',
		template: templates.paginationViewTemplate,
		model: new PaginationModel(),
		events: {
			'click .pagination': 'toggleOpen',
			'click ul li': 'selectedPageSize'
		},
		initialize: function (opts) {
			this.model.set(opts);
		},
		render: function () {
			this.$el.append(this.template(this.model.toJSON()));
		},
		toggleOpen: function () {
			this.$el.find('ul').toggleClass('open');
		},
		selectedPageSize: function (e) {
			var target = $(e.currentTarget);

			if (target.attr('data-value') != this.$el.find('label').html()) {

			}

			this.$el.find('ul').removeClass('open');
		}
	});
});