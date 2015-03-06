define(['common/backbone', './templates', './TodoModel'], function(Backbone, templates, TodoModel) {
	return Backbone.View.extend({
		tagName: 'li',
		template: templates.TodoItemView,
		events: {
			'click a.destroy': 'removeTodo'
		},
		initialize: function(options) {
			this.model = options.model;
		},
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
		},
		removeTodo: function(e) {
			var _id = $(e.target).data('todoId');
			
			this.model.save({
				url: '/todo/remove/'+_id,
				success: function(model, response, options) {
				},
				error: function(model, response, options) {
				}
			});
		}
	});
});