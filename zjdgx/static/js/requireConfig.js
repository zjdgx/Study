/**
 * Build Date: 15/8/6 9:35.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

var require = {
	baseUrl: '<%= baseUrl %>',
	urlArgs: 'bust=<%= requireJSVersion %>',
	paths: {
		'jquery': 'common/jquery',
		'underscore': 'common/underscore.min',
		'backbone': 'common/backbone.min',
		'zjdgxPopup': 'components/popup'
	},
	slim: {
		zjdgxPopup: {
			deps: ['jquery']
		}
	}
};