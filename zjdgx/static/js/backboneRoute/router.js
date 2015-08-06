/**
 * Build Date: 15/8/6 9:09.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */


define(['jquery', 'backbone', '../test/view1', '../test/view2', '../test/view3'], function ($, Backbone, View1, View2, View3) {
	return Backbone.Router.extend({
		routes: {
			'': 'loadMain',
			':a': 'loadTest1',
			':b/:v': 'loadTest2'
		},
		loadMain: function () {
			$('body').append(new View1().render().el);
		},
		loadTest1: function () {
			$('body').append(new View2().render().el);
		},
		loadTest2: function () {
			$('body').append(new View3().render().el);
		}
	});
});