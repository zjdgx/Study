/**
 * Created by nhn on 2014/11/5.
 */
var count = 0;
$(function(){
    var TodoModel = Backbone.Model.extend({
        defaults: function(){
            return {
                title: "todo",
                done: false
            };
        },
        toggle: function(){
            this.save({done: !this.get("done")});
        }
    });

    var TodoList = Backbone.Collection.extend({
        model: TodoModel,
        localStorage: new Backbone.LocalStorage("todos-backbone"),
        done: function(){
            return this.where({done:true});
        },
        remaining: function(){
            return this.where({done:false});
        }
    });

    var TodoView = Backbone.View.extend({
        tagName: "li",
        template: _.template($("#item-template").html()),
        initialize: function(){
            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.model, "destroy", this.remove);
        },
        events: {
            "click .toggle": 'toggleDone',
            "click a.destroy": 'clear'
        },
        toggleDone: function(){
            this.model.toggle();
        },
        clear: function(){
            this.model.destroy();
        },
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.toggleClass("done", this.model.get("done"));
            return this;
        }
    });

    var Todos = new TodoList;
    var AppView = Backbone.View.extend({
        el: $("body"),
        events: {
            "keypress #todo":"createTodo"
        },
        initialize: function(){
            this.input = $("#todo");
            this.todoList = $(".main ul");
            this.listenTo(Todos,"add",this.addOne);
            this.listenTo(Todos,"reset",this.addAll);
            Todos.fetch();
        },
        addOne: function(todo) {
            console.log( 1234 );
            var view = new TodoView({model:todo});
            this.todoList.append(view.render().el);
        },
        addAll: function(){
            Todos.each(this.addOne,this);
        },
        createTodo: function (e) {
            if(e.keyCode != 13) return;
            if($.trim( this.input.val() ).length == 0) return;
            var title = $.trim( this.input.val() );
            Todos.create({title:title});
            this.input.val("");
        }
    });
    var appView = new AppView;
});