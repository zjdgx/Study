/**
 * Build Date: 15/8/6 15:05.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

define(['jquery', 'backbone', './templates'], function ($, Backbone, templates) {
	return Backbone.View.extend({
		className: 'zjdgxPopup',
		template: templates.alertViewTemplate,
		events: {
			'click i.close': 'close',
			'click .btn-sure': 'confirm',
			'click .btn-cancel': 'close'
		},
		initialize: function () {
		},
		render: function (options) {
			this.$el.html(this.template(options));
			$('body').append(this.el);
		},
		close: function () {
			this.$el.remove();
		},
		confirm: function () {
			this.$el.remove();
		}
	});
});