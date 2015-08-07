/**
 * Build Date: 15/8/6 15:05.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

define(['jquery', 'backbone', './components/templates'], function ($, Backbone, templates) {
	return Backbone.View.extend({
		className: 'zjdgxPopup',
		template: templates.popupTemplate,
		events: {
			'click i.close': 'close',
			'click .btn-sure': 'confirm',
			'clicl .btn-cancel': 'close'
		},
		initialize: function () {
		},
		render: function (options) {
			this.sureCallback = options.sureCallback;
			this.$el.html(this.template(options));
			this.$el.addClass(options.className).find('.content').html(options.content);
			$('body').append(this.el);
		},
		close: function () {
			this.$el.remove();
		},
		confirm: function () {
			if (this.sureCallback) {
				this.sureCallback('zldldlslas');
			}
		}
	});
});