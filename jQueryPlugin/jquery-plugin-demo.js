/**
 * this keyword in plugin
 */
;(function($){
	function zjdgx(a, b) {
		console.log('a: ' + a + ', b: ' + b);
	};
	$.fn.pinkify = function() {
		zjdgx(1,2);
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

/**
 * 保持私有函数的私有性
 */
;(function($, window, document, undefined){
	$.fn.dataCruncher = function(options) {
		//插件之外不可访问
		function privateSort( data ) {
			// 私有方法
		}
		return this.each(function() {
			var data = privateSort( data );
		});
	}
})(jQuery, window, document)
;(function($, window, document, undefined) {
	$.fn.highlight = function(options) {
		debug(this);
		var opts = $.extend({}, $.fn.highlight.defaults, options);
		return this.each(function() {
			$this = $(this);
			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			$this.css({
				backgroundColor: o.background,
				color: o.foreground
			});
			var markup = $this.html();
			markup = $.fn.highlight.format(markup);
			$this.html(markup);
		});
	};
	// 私有函数：debug
	function debug($obj) {
		if (window.console && window.console.log)
			window.console.log('highlight selection count: ' + $obj.size());
	};
	// 定义暴露format函数
	$.fn.highlight.format = function(txt) {
		return '<strong>' + txt + '</strong>';
	};
	// 插件的defaults
	$.fn.highlight.defaults = {
		foreground: 'red',
		background: 'yellow'
	};
})(jQuery, window, document)

/*==========================jQuery widget==========================*/
/* progress bar
--------------------*/
$.widget('zjdgx.progressbar', {
	options: {
		showArrow: true
	},
	// 重写_create方法
	_create: function() {
		var progress = this.options.value + '%',
			progressText = '<div class="curRate showArrow" style="width: '+this.options.value+'%;">'+progress+'</div><i class="curPosition"></i>';
			
		if (!this.options.showArrow) {
			progressText = '<div class="curRate" style="width: '+this.options.value+'%;"></div><div class="barText">'+progress+'</div>';
		}
		this.element.addClass('progressbar').append(progressText);
		this.setArrowPosition();
	},
	setArrowPosition: function() {
		if (this.options.showArrow) {
			this.element.find('.curPosition').css('left', this.element.find('.curRate').width()-4);
		}
	},
	widgetEventPrefix: 'zjdgx',
	value: function (value) {
		if (value) {
			if (value > 100) {
				value = 10;
			}
			
			if (value < 0) {
				value = 0;
			}
			
			this.options.value = value;
			if (this.options.showArrow) {
				this.element.find('.curRate').css('width', value+'%').html(value+'%');
			} else {
				this.element.find('.curRate').css('width', value+'%').next().html(value+'%');
			}
			this.setArrowPosition();
			// 提供回调功能让用户进行扩展
			if (this.options.value == 100) {
				this._trigger('complete', null, {value: 100});
			}
			//**事件类型则是由插件名称和回调名称合并而成(progressbarcomplete)。回调和事件被触发时会收到同样的两个参数：事件对象和相关数据
		} else {
			return this.options.value;
		}
	},
	// 当参数被修改时执行一些操作
	_setOption: function (key, value) {
		this.options[key] = value;
		if (key === 'value')
			this.value(value);
	},
	destroy: function() {
        this.element
            .removeClass("progressbar progressbar-with-arrow progressbar-with-no-arrow")
			.removeAttr("style")
            .text("");

        // call the base destroy function
        $.Widget.prototype.destroy.call(this);
    },
	complete: function (options) {
		this.element.html(options.str).css(options.style);
	}
});

/* widget extension
--------------------*/
$.widget('zjdgx.dialog', $.ui.dialog, {
	red: function() {
		var e = this.element;
		if ( e.css('color') === '#f00' || e.css('color') === 'rgb(255, 0, 0)' ) {
			this.blue();
		} else {
			e.css('color', '#f00');
		}
		return this;
	},
	blue: function() {
		this.element.css('color', '#0f0');
		return this;
	},
	close: function() {
		console.log('zjdgx-dialog closed.....');
		this._super('close');
	}
});

/* widget _supper _supperApply
-------------------------------*/
$.widget('zjdgx.suppercompute', {
	compute: function(a, b) {
		this.element.html(a+b);
		console.log('suppercompute: '+ (a+b));
	}
});
$.widget('zjdgx.subcompute', $.zjdgx.suppercompute, {
	compute: function(a, b, c) {
		console.log('subcompute called suppercompute...');
		this._super(a, b);
		this.element.html(a+b+c);
		console.log('subcompute: '+ (a+b+c));
	}
});

/* textboxdecorator
--------------------*/
$.widget('ui.textboxdecorator', {
	options: {},
	_init: function(){  
		//验证是否是需要装饰的元素 
		
		//this.element也就是调用此widget的元素  
		var e = this.element,
			tg = e[0].tagName.toLowerCase(),
			ty = e.attr("type").toLowerCase();
		  
		if (!(tg === "input" || tg === "textarea")) {  
			return;  
		}  
		if (!(ty === "text" || ty === "password")) {  
				return;  
		}  
		
		//ui-widget widget基本的样式，ui-state-default。默认状态的样式；ui- corner-all 圆角（基于css3，ie下不起作用）  
		e.addClass("ui-widget ui-state-default ui-corner-all");  
		//添加hover效果和active效果  
		e.mouseover(function(){  
			e.addClass("ui-state-hover");  
		}).mouseout(function(){  
			e.removeClass("ui-state-hover");  
		}).mousedown(function(){  
			e.addClass("ui-state-active");  
		}).mouseup(function(){  
			e.removeClass("ui-state-active");  
		});  
	},  
	//销毁时，移除widget增加的样式  
	destroy:function(){  
		this.element.removeClass("ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active");  
	}
});
/*==========================jQuery widget==========================*/