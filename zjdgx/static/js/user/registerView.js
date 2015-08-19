/**
 * Build Date: 15/8/7 10:45.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

define(['jquery', 'backbone', 'backboneModelBinder', './templates', './registerModel', '../common/zjdgxUtil'], function ($, Backbone, ModelBinder, templates, registerModel) {
	return Backbone.View.extend({
		className: 'zjdgxPopup register',
		template: templates.registerTemplate,
		model: new registerModel(),
		modelBinder: new ModelBinder(),
		events: {
			'click i.close': 'close',
			'click .btn-sure': 'save',
			'click .btn-cancel': 'close'
		},
		initialize: function () {
		},
		render: function (type) {
			var self = this,
					opts = {
						title: '注册',
						className: 'register',
						sureText: '注册',
						cancelText: '取消'
					};

			this.$el.html(this.template(opts));

			this.modelBinder.bind(this.model, this.$el, {
				name: "[name=username]",
				email: "[name=email]",
				phone: "[name=phone]",
				password: "[name=password]"
			});

			return this;
		},
		save: function () {
			var self = this;

			this.model.save(
				{
				},
				{
					wait: true,
					success: function (model, response) {
						self.close({msg: '注册成功.', title: '提示', sureText: '确定', type: 'success'});
					},
					error: function (error, model) {
						self.close({msg: '注册成功.', title: '提示', sureText: '确定', type: 'error'});
					}
				}
			);
		},
		close: function (opts) {
			if (opts instanceof $.Event) {
				this.$el.remove();
			} else {
				var self = this;

				this.$el.find('.inner').animate({top: -$(window).height()/2, opacity: 0}, 200, function () {
					self.$el.remove();
					zjdgxUtil.alert(opts);
				});
			}
		}
	});
});