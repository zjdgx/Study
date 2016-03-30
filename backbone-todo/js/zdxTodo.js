var count = 0;
$(function(){
	var TodoModel = Backbone.Model.extend({
		defaults: function() {
			return {
				title: "todo",
				done: false,
				order: Todos.nextOrder()
			};
		},
		toggle: function() {
			this.save({"done": !this.get("done")});
		}
	});
	
	var TodoList = Backbone.Collection.extend({
		model: TodoModel,
		localStorage: new Backbone.LocalStorage("todo-zjdgx-home"),
		done: function(){
			return this.where({"done":true});
		},
		remaining: function(){
			return this.where({"done":false});
		},
		nextOrder: function(){
			if( !this.length ) return 1; 
			return this.last().get("order")+1;
		},
		comparator: "order"
	});
	
	var TodoView = Backbone.View.extend({
		tagName: "li",
		template: _.template($("#item-template").html()),
		initialize: function(){
			this.listenTo(this.model, "change", this.render);
			this.listenTo(this.model, "destroy", this.remove);
		},
		events: {
			"click .toggle" : "toggleDone",
			"click .destroy" : "clear"
		},
		toggleDone: function(){
			this.model.toggle();
		},
		clear: function() {
			this.model.destroy();
		},
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.toggleClass("done",this.model.get("done"));
			return this;
		}
	});
	
	Todos = new TodoList;
	var AppView = Backbone.View.extend({
		el: $("body"),
		events: {
			"keypress #todo" : "createTodo",
			"click #toggleAllComplete" : "toggleAllComplete"
		},
		initialize: function(){
			this.input = $("#todo");
			this.checkAll = $("#toggleAllComplete")[0];
			this.checkAll.checked = !Todos.remaining().length;
			this.todolist = $(".main ul");
			this.listenTo(Todos, "add", this.addOne);
			this.listenTo(Todos, "reset", this.addAll);
			this.listenTo(Todos, "all", this.render);
			Todos.fetch();
		},
		addOne: function( todo ){
			var view = new TodoView({model: todo});
            this.$(".main ul").append(view.render().el);
		},
		addAll: function(){
			Todos.each(this.addOne, this);
		},
		render: function() {
			if( Todos.length==0 ) {
				this.checkAll.checked = false;
				return;
			}
			this.checkAll.checked = !Todos.remaining().length;
			
		},
		createTodo: function( e ) {
			if(e.keyCode != 13)return;
			if($.trim( this.input.val() ).length == 0) return;
			
			var title = $.trim( this.input.val() );
			Todos.create({title: title});
			this.input.val("");
		},
		toggleAllComplete: function() {
			var done = this.checkAll.checked;
			Todos.each(function(todo){
				todo.save({"done":done});
			});
		}
	});
	var appView = new AppView;
});