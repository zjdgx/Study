define(['common/backbone', './templates', './TodoCollection', './TodoItemView'], function (Backbone, templates, TodoCollection, TodoItemView) {
	return Backbone.View.extend({
		el: 'body',
		initialize: function () {
			this.collection = new TodoCollection();
			this.listenTo(this.collection, 'destroy', this.updateCollection);
		},
		events: {
			'keypress input#todo': 'newTodo'
		},
		updateCollection: function (model, b, c) {
			console.log('collection destroy...');
			//TODO: model
			this.collection.remove(model,{url: '/todo/remove',success: function(collection, response, options) {}, error: function (collection, response, options) {
				
			}});
		},
		newTodo: function (e) {
			var self = this;

			if ((e.type === 'keypress' && e.keyCode === 13) || e.type === 'blur') {
				var t = $("#todo").val().trim();

				if (t.length > 0) {
					self.collection.create(
						{
							'content': t
						},
						{
							url: '/createTodo',
							success: function(model, res) {
								if (res.result == 1) {
									$("#todo").val('');
									self.render();
								} else {
									console.warn('Task create failed....');
								}
							},
							error: function(collection, response, options) {
								console.log(response.responseText);
							}
						}
					);
				}
			}
		},
		render: function () {
			var self = this;

			this.$el.find('ul').empty();
			this.collection.fetch({
				success: function () {
					self.collection.each(self.addItem, self);
				},
				error: function (collection, response, options) {
					console.warn(response.responseText);
				}
			})
		},
		addItem: function (item) {
			var todoItemView = new TodoItemView({model: item});

			this.$el.find('ul').append(todoItemView.render().el);
		}
	});
});