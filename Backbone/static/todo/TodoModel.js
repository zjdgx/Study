define(['common/backbone', 'common/underscore'], function (Backbone, _) {
	return Backbone.Model.extend({
		idAttribute: '_id',
		defaults: {
			
		},
		toJSON: function() {
			var t = {};
			
			t.content = this.get('content');
			t.date = this.get('date');
			
			return t;
		}
	});
});