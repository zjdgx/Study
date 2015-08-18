/**
 * Build Date: 15/8/7 10:45.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

define(['jquery', 'backbone', 'backboneModelBinder', './templates', './registerModel', 'zjdgxPopup'], function ($, Backbone, ModelBinder, templates, registerModel, PopupView) {
	return Backbone.View.extend({
		className: 'register',
		template: templates.registerTemplate,
		model: new registerModel(),
		modelBinder: new ModelBinder(),
		initialize: function () {

		},
		render: function () {
			var self = this;

			new PopupView().render({
				title: '注册',
				className: 'register',
				content: this.$el.html(this.template()).html(),
				sureCallback: function () {
					self.save();
				},
				sureText: '注册',
				cancelText: '取消'
			});
			this.modelBinder.bind(this.model, this.el);
		},
		close: function () {

		},
		save: function () {
			this.setValue();
			this.model.save(
				{
				},
				{
					wait: true,
					success: function (model, response) {
						console.log(JSON.stringify(model)+'\n==============================\n'+JSON.stringify(response));
					},
					error: function (error, model) {

					}
				}
			);
		},
		setValue: function () {
			this.model.set('name', $('input[name="name"]').val());
			this.model.set('email', $('input[name="email"]').val());
			this.model.set('phone', $('input[name="phone"]').val());
			this.model.set('password', $('input[name="password"]').val());
		}
	});
});