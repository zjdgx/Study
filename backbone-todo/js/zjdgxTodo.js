/**
 * Created by nhn on 2014/11/5.
 */
var count = 0, addOne = 0;
$(function(){
   var TodoModel = Backbone.Model.extend({
      defaults: function() {
          return {
              title: "todo",
              order: Todos.nextOrder(),
              done: false
          }
      },
      toggle: function(){
          this.save({"done":!this.get("done")});
      }
   });
   var TodoList = Backbone.Collection.extend({
      model: TodoModel,
      localStorage: new Backbone.LocalStorage("todos-zjdgx-backbone"),
      done: function(){
          return this.where({"done":true});
      },
      remaining: function () {
          return this.where({"done":false});
      },
       // We keep the Todos in sequential order, despite being saved by unordered
       // GUID in the database. This generates the next order number for new items.
       nextOrder: function() {
           if (!this.length) return 1;
           return this.last().get('order') + 1;
       },

       // Todos are sorted by their original insertion order.
       comparator: 'order'
   });

   var TodoView = Backbone.View.extend({
      tagName: "li",
      template: _.template($("#item-template").html()),
      events: {
          "click .toggle":"toggleDone",
          "click .destroy":"clear"
      },
      initialize: function() {
          this.listenTo(this.model, "change", this.render);
          this.listenTo(this.model, "destroy", this.remove);
      },
      toggleDone: function() {
          this.model.toggle();
      },
      clear: function(){
          this.model.destroy();
      },
      render: function( todo ) {
          var done = this.model.get("done");
          this.$el.html( this.template(this.model.toJSON()) );
          this.$el.toggleClass("done",done);
          return this;
      }
   });

   var Todos = new TodoList;

   var AppView = Backbone.View.extend({
      el: $("body"),
      events: {
          "keypress #todo": 'createTodo',
          "click #toggleAllComplete":'toggleAllComplete'
      },
      initialize: function(){
          this.input = $("#todo");
          this.checkAll = $("#toggleAllComplete")[0];
          this.listenTo(Todos, "add", this.addOne);
          this.listenTo(Todos, 'reset', this.addAll);
          Todos.fetch();
      },
      addOne: function ( todo ) {
          var view = new TodoView({model:todo});
          if(!todo.get("done")) {
              this.checkAll.checked = false;
          }
          this.$(".main ul").append(view.render().el);
      },
      addAll: function() {
          Todos.each(this.addOne, this);
      },
      createTodo: function( e ) {
          if(e.keyCode != 13) return;
          if($.trim(this.input.val()).length == 0) return;
          var title = $.trim( this.input.val() );
          Todos.create({title:title});
          this.input.val("");
      },
      toggleAllComplete: function(){
          var done = this.checkAll.checked;
          Todos.each(function(todo){
              todo.save({"done":done});
          });
      }
   });
   var appView = new AppView;
});