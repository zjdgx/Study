/**
 * this keyword in plugin
 */
;(function($){
	$.fn.pinkify = function() {
		// this引用的是jQuery本身
		return this.each(function() {
			// 在循环体内，this关键字引用的是DOM元素
			$(this).css({
				'background-color': '#fe57a1',
				'color': '#fff',
				'text-shadow': 'none'
			});
		});
	}
})(jQuery)
/**
 * set options for plugin
 */
;(function($){
	$.fn.bestPluginEver = function(options) {
		var settings = $.extend({
				'color': '#fff',
				'background-color': '#fe57a1'
			}, options);
		
		return this.css(settings);
	}
})(jQuery)
/**
 * set `defaults` to be public for plugin
 */
;(function($){
	$.fn.bestPluginEverDefaults = function(options) {
		var settings = $.extend({}, $.fn.bestPluginEverDefaults.defaults, options);
		
		return this.each(function(){
			$(this).css('width', settings.width);
		});
	};
	
	$.fn.bestPluginEverDefaults.defaults = {
		width: 100
	};
})(jQuery)