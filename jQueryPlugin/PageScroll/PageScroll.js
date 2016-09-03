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
				curIndex: 0
			});
			
			return this.each(function (index, target) {
				var navigate = createNavigate(target, options.itemClass),
						isRunning = false;
				
				$(target).wrap('<div class="zjdgx-page-scroll-wrap"></div>');
				$('.zjdgx-page-scroll-wrap').append(navigate);
				$('.' + options.itemClass).mousewheel(function () {
					var index = $(this).index(),
							cur = $(this).next();
							
					if (!isRunning) {
						isRunning = true;
						
						$('.' + options.itemClass).each(function () {
							var opacity = $(this).index() == index + 1 % 5 ? 1 : 0,
									left = ($(this).index() - index - 1) * 100 + '%';
							
							$(this).animate({
								left: left,
								opacity: opacity
							}, 500, function () {
								isRunning = false;
							});
						});
					}
				});
			});
			
			function createNavigate (container, className) {
				var pagesLength = $(container).find('.' + className).length,
						result = ['<div class="zjdgx-page-scroll-navigate">'];
				
				for (var i = 0; i < pagesLength; i++) {
					result.push('<a ' + (options.curIndex == i ? ' class="cur"' : '')+ ' href="javascript:void(0);"></a>');
				}
				
				result.push('</div>');
				
				return result.join('');
			}
		}
	})
})(jQuery, window, document);