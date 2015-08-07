/**
 * Build Date: 15/8/7 10:45.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

define(['jquery', 'backbone', './templates', 'zjdgxPopup'], function ($, Backbone, templates, PopupView) {
	return Backbone.View.extend({
		className: 'register',
		template: templates.registerTemplate,
		initialize: function () {

		},
		render: function () {
			new PopupView().render({
				title: '注册',
				className: 'register',
				content: this.$el.html(this.template()).html(),
				sureCallback: function (data) {
					console.log(data);
				},
				sureText: '注册',
				cancelText: '取消'
			})
		},
		close: function () {

		},
		save: function () {

		},
		validate: function () {

		}
	});
});