define(['common/backbone', './templates', './TodoCollection', './TodoItemView'], function(Backbone, templates, TodoCollection, TodoItemView) {
	return Backbone.View.extend({
		el: '#todoList',
		templdate: '<div>2123</div>',
		initialize: function() {
			this.collection = new TodoCollection();
		},
		render: function() {
			var self = this;
			
			this.collection.fetch({
				success: function() {
					// collection.length === 0
					self.collection.each(self.addItem, self);
				},
				error: function(collection, response, options) {
					console.warn(response.responseText);
				}
			})
		},
		addItem: function(item) {
			console.log('todoview addItem....');
			
			var todoItemView = new TodoItemView({model: item});
			
			this.$el.append(todoItemView.render().el);
		}
	});
});