/**
 * Build Date: 15/8/4 13:31.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
	var zjdgx = {};

	zjdgx.loadMain = function () {
		var self = this;

		require(['./test/view1', 'backboneRoute/router'], function (View, Router) {
			Backbone.history.stop();
			self.router = new Router({view: new View()});
			Backbone.history.start({root: '/', pushState: false, silent: false});
		})
	};

	return zjdgx;
});