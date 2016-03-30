define(['common/backbone', './templates', './TodoModel'], function (Backbone, templates, TodoModel) {
	return Backbone.View.extend({
		tagName: 'li',
		template: templates.TodoItemView,
		events: {
			'click a.destroy': 'removeTodo'
		},
		initialize: function (options) {
			this.model = options.model;
		},
		render: function () {
			this.$el.html(this.template(this.model.toTemplateObject()));

			return this;
		},
		removeTodo: function (e) {
			var t = this;

			this.model.destroy({url:'/todo/remove/'+this.model.get('_id'),success: function(model, response) {
				if (response.result == 1) {
					t.remove();
				}
			}});
		}
	});
});