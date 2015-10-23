/**
 * Build Date: 15/10/21 11:47.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

define(['jquery', 'backbone', './registerView'], function ($, Backbone, RegisterView) {
	return Backbone.View.extend({
		el: '.header',
		events: {
			'click a.login': 'login',
			'click a.register': 'register'
		},
		login: function () {

			return false;
		},
		register: function () {
			$('body').append(new RegisterView().render().el);

			return false;
		}
	});
});