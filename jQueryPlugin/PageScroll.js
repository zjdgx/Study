/**
 * Build Date: 2016/07/11 10:55.
 * Copyright (c): ZJDGX
 * Autor: ZJDGX
 * Description: jquery page scroll plugin
 */
 
;(function ($, window, document, undefined) {
	$.extend($.fn, {
		pageScroll: function (options) {
			options = $.extend(options, {
				itemClass: 'page',
				curIndex: -1
			});
			
			return this.each(function (index, target) {
				var wrapper = $(target).wrap('<div class="zjdgx-page-scroll-wrap"></div>');
				var navigate = createNavigate(target, options.itemClass);
				$(wrapper).append(navigate);
			});
			
			function createNavigate (container, className) {
				var pagesLength = $(container).find('.' + className).length,
						result = ['<div class="zjdgx-page-scroll-navigate">'];
				
				for (var i = 0; i < pagesLength; i++) {
					result.push('<a href="javascript:void(0);"></a>');
				}
				
				reuslt.push('</div>');
				
				return result.join('');
			}
		}
	})
})(jQuery, window, document);