$('#thiskeyword').click(function(){
	$(this).pinkify();
});
$('#chainCall').click(function(){
	$(this).next().pinkify().css({'font-weight':'bold','text-align':'center'});
});
$('#widgetTextbox').textboxdecorator();

$('.seeCode').click(function(){
	var $li = $(this).parents('li').find('h1');
		code = $(this).parents('li').find('.prettyprint').clone();
	$(this).parents('li').find('.prettyprint').dialog({title: $li.html(), width: 800, height: 400, close: function(event){
		$li.after(code);
	}});
});

var tbar;
$('#progressbarTest').click(function(){
	var t = $(this);
	if ($('.progressbarTest').hasClass('progressbar-with-no-arrow')) {
		tbar.progressbar('option', 'value', tbar.progressbar('value')+10);
	} else {
		tbar = $('.progressbarTest').progressbar({
			className: 'progressbar-with-no-arrow',
			showArrow: false,
			value: 10,
			complete: function(event, data) {
				$(this).html(data.str).css(data.style);
			}
		});
	}
});
$('#progressbarWithArrow').click(function(){
	var t = $(this);
	if ($('.progressbarTest').hasClass('progressbar-with-arrow')) {
		tbar.progressbar('option', 'value', tbar.progressbar('value')+10);
	} else {
		tbar = $('.progressbarTest').progressbar({
			className: 'progressbar-with-arrow',
			value: 10,
			complete: function(event, data) {
				$(this).html(data.str).css(data.style);
			}
		}).bind('zjdgxcomplete', function(event, data){
			console.log('complete event triggered....');
		});
	}
});
$('#_destroy').click(function(){
	$('.progressbarTest').progressbar("destroy");
});

/** widget extension
--------------------*/
$('.widgetExtend').click(function(){
	$('.widgetExtendText').dialog({title:'widget继承测试'}).dialog('red');
});


/** widget _supper _supperApply
------------------------------*/
$('#supper').click(function(){
	$('#_supperResult p:first').suppercompute().suppercompute('compute', 1, 2);
});

$('#supperSub').click(function(){
	$('#_supperResult p:last').subcompute().subcompute('compute',1,2,3);
});


$('div.fntest button.finalTest').click(function(){
	$('div.fntest p').highlight();
});

$('div.fntest button.finalTest2').click(function(){
	$.fn.highlight.defaults = {
		foreground: '#fff',
		background: '#5E76F4'
	};
	$.fn.highlight.format = function(txt) {
		return txt.replace(/(\btext\b)/g, '<font color="#f00">$1</font>');
	};
	$('div.fntest p').highlight();
});
