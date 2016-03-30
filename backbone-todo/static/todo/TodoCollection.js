define(['common/backbone','./TodoModel'], function(Backbone, TodoModel){
	return Backbone.Collection.extend({
		model: TodoModel,
		count: 0,
		url: function() {
			return '/todoList';
		},
		parse: function(resp) {
			this.count = resp.count;
			
			return resp.results;
		}
	});
});