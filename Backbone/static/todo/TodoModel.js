define(['common/backbone', 'common/underscore'], function (Backbone, _) {
	return Backbone.Model.extend({
		idAttribute: '_id',
		defaults: {
			content: 'x',
			date: ''
		},
		toTemplateObject: function() {
			var t = {};

			t._id = this.get('_id');
			t.content = this.get('name');
			t.date = this.get('createTime');
			t.completed = this.get('completed');
			
			return t;
		}
	});
});