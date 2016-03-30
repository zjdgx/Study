define(['common/jquery', 'common/underscore', 'common/backbone'], function($, _, Backbone) {
	
	var zjdgx = {};
	
	zjdgx.todoMain = function() {
		require(['./todo/TodoView'], function(TodoView){
			var mainview = new TodoView();
			
			mainview.render();
		});
	};

	return zjdgx;
});