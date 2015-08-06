/**
 * Build Date: 15/8/6 15:05.
 * Copyright (c): NHN China Co.,LTD
 * Author: jianggang
 * Description:
 */

(function ($) {
	$.popup = function (content, options) {
		$('body').append(popupHTML(content, options));
	};

	function popupHTML (content, options) {
		return '<div '+(options.id ? 'id="'+options.id+'"' : '')+' class="zjdgxPopup'+(options.className ? ' '+options.className : '')+'">'
				+ '<div class="wrapper"><div class="inner">'
				+ (options.title ? '<h1 class="title">' + options.title + '</h1>' : '')
				+ '<div class="content">' +content+ '</div>'
				+ '<div class="btn-group ' + (options.type || 'alert') + '">'
				+ '<span class="sure">确定</span>'
				+ ('alert' != options.type ? '<span class="cancel">取消</span>' : '')
				+ '</div></div></div></div>'
	}
})(jQuery);