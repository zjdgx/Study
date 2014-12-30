$(function(){
	var object = {};

	_.extend(object, Backbone.Events);

	object.on('alert', function(msg){
		alert('Triggered: '+msg);
	});

	object.trigger('alert','an event');
});