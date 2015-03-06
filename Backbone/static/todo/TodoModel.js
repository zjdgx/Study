define(['common/backbone', 'common/underscore'], function (Backbone, _) {
	return Backbone.Model.extend({
		idAttribute: '_id',
		defaults: {
			
		},
		toJSON: function() {
			var t = {};
			
			t.title = this.get('title');
			t.date = this.get('date');
			
			return t;
		}
	});
});