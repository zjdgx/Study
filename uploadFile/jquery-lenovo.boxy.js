(function(win, doc, $){

	function css(element, css){
		for(var i in css){
			element.style[i] = css[i];
		}
		return element;
	}

	function create(tag, cssobj) {
		return css(doc.createElement(tag), cssobj);
	}

	function append(node, content) {
		if(content){
			if (typeof content == "string") {
				if(node.insertAdjacentHTML){
					node.insertAdjacentHTML("beforeEnd", content);
				} else {
					var elem = node.ownerDocument.createRange();
					elem.setStartBefore(node);
					node.appendChild(elem.createContextualFragment(content));
				}
			} else if ("length" in content && !content.nodeType){
				for( var i = 0; i < content.length; i++) {
					append(node, content[i]);
				}
			} else {
				node.appendChild(content);
			}
		}
	}
	function getElement(node, tag){
		try{
			return node.querySelectorAll(tag);
		}catch(ex){
			return node.getElementsByTagName(tag);
		}
	}

	var msie /*@cc_on = doc.documentMode || (doc.compatMode == "CSS1Compat" ? "XMLHttpRequest" in win ? 7 : 6 : 5) @*/;

	function lightbox(content){
		var table, cell, dialog;

		table = create("section", {
			position: "fixed",
			height: "100%",
			width: "100%",
			left: "-999%",
			top: "-999%"
		});
		cell = create("div", {
			verticalAlign: "middle",
			textAlign: "center"
		});
		dialog = create("dialog", {
			display: "inline-block",
			position: "relative",
			textAlign: "left"
		});
		
		table.className = "lightbox";
		table.appendChild(cell);
		cell.appendChild(dialog);

		if( msie < 8 ){
			css(table, {
				display: "block"
			});
			css(cell, {
				verticalAlign: "baseline",
				wordBreak: "keep-all",
				whiteSpace: "nowrap",
				position: "absolute",
				display: "block",
				width: "100%",
				top: "50%",
				left: 0
			});
			css(dialog, {
				top: "-50%"
			});
			if( msie < 7 ) {
				table.style.position = "absolute";
				function expre(prop, value) {
					setTimeout(function(){
						table.style.setExpression(prop, "offsetParent." + value);
					},1);
				} 
				expre("height", "clientHeight");
				expre("width", "clientWidth");
				expre("top", "scrollTop");
				if(doc.documentElement.currentStyle.backgroundImage == 'none'){
					with(doc.documentElement.style){
						backgroundImage = "url(about:blank)";
						backgroundAttachment = "fixed";
						backgroundRepeat = "no-repeat";
					}
				}
			}
		} else {
			css(table, {
				display: "table"
			});
			css(cell, {
				display: "table-cell"
			});
		}

		css(table, msie < 9 ? {
			filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#CC000000,endColorstr=#CC000000)"//,
			//background: "url(about:blank)"
		} : {
			background: "rgba(0,0,0,0.8)"
		});

		append(dialog, content);

		(doc.body || doc.documentElement).appendChild(table);

		return {
			show: function(){
				if (msie < 8) {
					css(dialog, {
						width: 0
					});
					css(dialog, {
						width: dialog.scrollWidth + "px"
					});
				}
				return this.toggle(true);
			},
			hide: function(){
				return this.toggle(false);
			},
			toggle: function(on) {
				table.style.top = table.style.left = on ? 0 : "-999%";
				return this;
			},
			dialog: dialog,
			lightbox: table
		}
	}

	lightbox.dialog = function(content){
		var box = lightbox('<div class="dialog"><a class="close" href="#">X</a></div>');
		getElement(box.dialog, "a")[0].onclick = function(){
			box.hide();
			return false;
		}
		append(getElement(box.dialog, "div")[0], content);
		return box;
	}

	lightbox.msgbox = function(msg, fun){
		var box = lightbox.dialog('<div class="msgbox"><div class="cont">' + (msg || "&nbsp;") + '</div><div class="btns"><span><input type="submit" value="确定"></span>' + (fun ? '<span><input type="reset" value="取消"></span>' : "") + '</div></div>');
		function bindclick(node, val) {
			if(node){
				node.onclick = function(){
					if(fun) {
						fun.call(win, !!val);
					}
					box.lightbox.parentNode.removeChild(box.lightbox);
					return false;
				}
			}
		}
		var btns = getElement(box.dialog, "input");
		bindclick(getElement(box.dialog, "a")[0]);
		bindclick(btns[0], true);
		bindclick(btns[1]);
		btns[0].focus();
		return box.show();
	}

	lightbox.loading = {
		show: function(){
			return lightbox.loading = lightbox('<div class="loading"></div>').show();
		}
	}


	if($) {
		$.fn.extend({
			lightbox: function(){
				var box = lightbox(this),
				jqobj = $(box.lightbox);
				return $.extend(jqobj, box);
			},
			dialog: function(){
				var box = lightbox.dialog(this),
				jqobj = $(box.lightbox);
				return $.extend(jqobj, box);
			}
		});

		$.extend({
			infobox: function(info, ok, show){
				$(".infobox").remove();
				var box = $('<div class="infobox"><div' + (ok ? ' class="ok"' : "") + '>' + info + '<a href="#" class="close">X</a></div></div>').appendTo(doc.body || doc.documentElement);
				
				function closebox(){
					box.fadeOut(function(){
						box.remove();
					});
					return false;
				}

				box.find(".close").click(closebox);

				if(!show){
					setTimeout(closebox, 1600);
				}

				return box;
			},
			loading: {
				show: function(){
					return $.loading = lightbox.loading.show();
				},
				hide: $.noop
			},
			msgbox: lightbox.msgbox
		});
	}

	window.lightbox = lightbox;

})(this, this.document, this.jQuery);