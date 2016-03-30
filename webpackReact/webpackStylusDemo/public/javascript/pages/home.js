require('../../style/index.styl');

define(['backbone'], function (Backbone) {
	return Backbone.view.extend({
		render: function () {
			document.write('webpack backbone demo')
		}
	});
});