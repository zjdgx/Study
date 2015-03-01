function photo() {};

/** 阻止事件冒泡 */
photo.stopEvent = function(e) {
	if (e.stopPropagation) {
		e.stopPropagation();
	} else {
		e.cancelBubble = true;
	}
};

/**检测会话过期*/
photo.checkSession = function(req) {
	if (req.status == 401) {
		photo.sessionTimeout = true;
		if($("#session").length>0)return;
		$.msgbox({msg:'您长期没有使用，请重新登录',no:'',id:"session"}, function(){
			location.href = LOGOUTURL;
		});
		return true;
	}
	return false;
};

/**相片确认框*/
photo.confirm = function(msg, yes, no, close) {
	return $.msgbox(msg, function(val) {
		if (val && yes)
			yes();
		else if (no)
			no();
	});
};

// 删除相片
photo.delPhoto = function( photoid ) {
	$.msgbox({msg:'<b>您确定要删除选中的相片？</b><br/><b style="color: #ff0000;font-weight:normal;font-size: 12px;">相片删除后将无法恢复！</b>',del:true},function(yes){
		if(yes){
			photo.deleteSelectPhoto([photoid]);
		}
	});
};

// 加载相片
photo.imageLoading = function(url, callback) {
	var img = document.createElement("img");
	img.onload = function() {
		this.onload = null;
		callback(img.src,img.width,img.height);
	};
	img.src = url;
};

/** 删除相片缓存中id为photoid的信息*/
photo.deleteCookieById = function(photoid) {
	var aid = photo.curAlbum , idLen = photoid.length;
	if(!$.isArray(photoid))
		photoid=[photoid];
	for(var j=0;j<idLen;j++){
		var id = photoid[j];
		for(var i=0,len=photo.pptData[aid].length; i<len; i++) {
			if(photo.pptData[aid][i].id == id){
				photo.pptData[aid].splice(i,1);//删除匹配的元素
				break;
			}
		}
	}

	photo.total -= idLen;
};

photo.protocol = location.protocol;
photo.formatUrl = function(url) {
	return url.replace(/^http[s]?:/, photo.protocol);
};
photo.downName = function(url, name) {
	if(window.navigator.userAgent.indexOf("Chrome") !== -1){//Chrome浏览器
		if (url.indexOf('?') == -1)
			return url + '?display_name=' + encodeURIComponent(name.replace(/,/g,''));
		return url + '&display_name=' + encodeURIComponent(name.replace(/,/g,''));
	} else {
		if (url.indexOf('?') == -1)
			return url + '?display_name=' + encodeURIComponent(encodeURIComponent(name.replace(/,/g,'')));
		return url + '&display_name=' + encodeURIComponent(encodeURIComponent(name.replace(/,/g,'')));
	}
};

photo.copyArr = function(t,o){
	var len = o.length;
	for(var i=0; i<len; i++){
		t.push(o[i]);
	}
};

//批量下载方法
photo.getDownPicUrl = function(){
	var data = [];
	$("#zdxPhoto li .choosepic").each(function(){
		var getChooseId = $(this).parents("li").attr("photoid");
		data.push(photo.idMap[getChooseId]);
	});
	return data;
}

/** 名字截断 */
photo.getLeft = function(name, len) {
	if (!name)
		return '';

	var n = name.replace(/[^\x00-\xFF]/g, 'mm');
	if (n.length <= len)
		return name;

	var i = len / 2, last = i;
	do {
		n = name.substring(0, i);
		n = n.replace(/[^\x00-\xFF]/g, 'mm');
		if (n.length <= len)
			last = i;
		i++;
	} while (n.length < len);

	return name.substring(0, last) + (name.length > last ? "..." : "");
};

/**批量下载flash*/
photo.flashDialog=null;
photo.zipDownload=function(flashUrl, installSwf){
	$('#photoList .toolbar .batchdownpic').click(function(){
		var t=$(this);
		if(t.is('.disable'))return false;
		var urls=photo.getDownPicUrl();
		if(urls.length==0){
			$.infobox('请选择需要下载的相片');
		}else{
			if(!photo.flashDialog){
				photo.flashDialog=$('.hidecode .downloadZipDialog').dialog(null, function(){
					var f=document.getElementById('batchdownpic');
					if(f)
						f.cancelDownload();
					return false;
				});
				var params={
						getSelectImages: 'photo.getDownPicUrl',
						showFlashInHtml: 'photo.showFlashInHtml',
						infoFunction: 'photo.showErrorByFlash',
						errorFunction: 'photo.showErrorByFlash',
						hideDialog: 'photo.hideZipDownloadDialog',
						loadedComplete: 'photo.loadedDownloadZip',
						zipFileCharset: 'gbk',
						crossdomainUrls:photo.flashCrossDomainUrls
					};
				var attrs={
					style: 'opacity:0;'
				};
				swfobject.embedSWF(flashUrl, "batchdownpic", "430", "300", "10.0.0", installSwf, params, {wmode:"transparent","allowScriptAccess":"always"});
			}else{
				document.getElementById('batchdownpic').startDownload();
			}
			photo.flashDialog.show();
		}
	});
};
photo.loadedDownloadZip=function(){
	setTimeout(function(){
		var el=photo.flashDialog.find('.loadingFlash');
		el.fadeOut('fast',function(){
			el.remove();
		});
	},1);
};
photo.hideZipDownloadDialog=function(success){
	setTimeout(function(){
		if(success)
			$.infobox('保存成功', true);
		photo.clearSelectInManager();
		photo.flashDialog.hide();
	},1);
};
photo.clearSelectInManager=function(){
	var tb=$('#photoList .toolbar');
	tb.find('.ui_radio input').checked(false);
	tb.find('.ui_checkbox input').checked(false);
	$('#photoList li .choosepic').removeClass('choosepic').find('.newMask').hide();
	photo.picmun = 0;
	tb.find('.picnumber').html('0');
	tb.find('.batchdownpic, .deleteallpic, .ui_menu').addClass('disable');
};
photo.showErrorByFlash=function(s){
	setTimeout(function(){
		$.infobox(s);
	},1);
};
photo.showFlashInHtml=function(){
};
function flashDebug(s){
	if(console&&console.log)console.log(s);
}

/**照片墙JS
--------------------------------*/
photo.getAllAlbums = function(){
	$.showTips.show();
	$.ajax({
		url: photo.photoApi + '/v3/albumquery',
		type:"GET",
		dataType:"json",
		success: function(zdx){
			$.showTips.hide();
			if(zdx.result == 0){
				var html = new StringBuffer(), t = $("#photoList .ui_menu ul"), h = 0;
				$.each(zdx.albumlist,function(i,v){
					if(v.id == photo.curAlbum){
						$("#photoList .coltitle h1").html(photo.escape(photo.getLeft(v.name,20)));
						photo.totalCount = v.count;
					} else {
						h += 24;
						html.append('<li name="'+v.id+'" title="'+v.name+'"><label><span class="ui_radio"><input type="checkbox"></span><span class="g-name">&nbsp;'+photo.escape(photo.getLeft(v.name,10))+'</span></label></li>');
					}
				});
				t.empty().append(html.toString());
				if($.browser.msie && $.browser.version < 8 && h > 200){
					t.css("height","200px").css("overflow-y","auto");
				}
				$.checkedEvent('#photoList .toolbar menu li input');
				if(h > 0){
					photo.bindMoveAction();
				} else {
					$('#photoList .toolbar .ui_menu').addClass("noalbum");
				}
				photo.getAllPhotoByAlbumId(photo.curAlbum,20,0);
			}
		},
		error: function(jg){
			$.showTips.hide();
			if (photo.checkSession(jg))return;
			$.infobox('获取相册信息失败，请稍后重试！');
		}
	});
};

/** 字符转义*/
photo.escape = function( str ) {
    var div = $(".hidecode .forEscape");
    if($.browser.mozilla){
        div[0].textContent = str;
        return div[0].innerHTML;
    } else {
        div[0].innerText = str;
        return div[0].innerHTML;
    }
};

/**绑定移动事件*/
photo.bindMoveAction = function(){
	var input = $("#photoList .toolbar menu li input");
	input.click(function(){
		var t = $(this), l = t.closest("li");
		if(t.is(":checked")){
			$("#photoList .toolbar menu li input:checked").checked(false);
			t.checked(true);
		} else {
			t.checked(false);
		}
	});
	$("#photoList .toolbar .ui_menu .btn").bind("click",function(){
		var c = $("#photoList .toolbar menu li input:checked");
		if(c.length == 0)
			return;
		else {
			photo.movePhoto(c.closest("li").attr("name"));
		}
	});
};

/**相片移动	*/
photo.movePhoto = function(albumto){
	var ids = [];
	$("#photoList .choosepic").each(function(){
		ids.push($(this).closest("li").attr("photoid"));
	});
	$.showTips.show();
	$.ajax({
		type: "POST",
		url: photo.photoApi + "/v3/photomove",
		data: '{"albumFrom":"'+photo.curAlbum+'","albumTo":"'+albumto+'","photoId":"'+ids.join(",")+'"}',
		dataType: "JSON",
		success: function(zdx){
			$.showTips.hide();
			if(zdx.result == 0){
				photo.totalCount -= ids.length;
				if(photo.totalCount == 0){
					$("#photoList .none").show();
					$("#photoList #zdxPhoto").empty().hide();
					$("#photoList .toolbar .picnumber").text(0);
					$("#photoList .toolbar .deleteallpic").addClass("disable");
					$("#photoList .toolbar .batchdownpic").addClass("disable");
					$("#photoList .toolbar .ui_menu").addClass("disable");
					$("#photoList .toolbar .ui_checkbox input").checked(false);
				} else {
					if(ids.length == $("#photoList .photolist li").length){
						photo.start = (photo.start == 0 ? 0 : photo.start - photo.count);
					}
					photo.getAllPhotoByAlbumId(photo.curAlbum, photo.count, photo.start);
				}
			}
		},
		error: function(jg){
			$.showTips.hide();
			if(photo.checkSession(jg))return;
			$.infobox("相片移动失败");
		}
	});
};

/**获取ID为albumid的相册的所有相片*/
photo.getAllPhotoByAlbumId = function(albumid, count, offset) {
	$.showTips.show();
	$.ajax({
		type : 'POST',
		url : photo.photoApi + '/v4/photoquery',
		data : '{"scale":"204x204","type":"area","albumid":' + albumid + ',"offset":'+offset+',"limit":' + count + '}',
		dataType : 'json',
		headers : {'Content-Type' : 'application/json; charset=utf-8'},
		success : function(r) {
			$.showTips.hide();
			$(".main .colmain ._fill").hide();
			if (r.result == 0) {
				photo.picmun = 0;
				photo.totalCount = r.total;
				photo.setPage(offset);
				photo.displayAlbumPhotoes(albumid, r.photolist);
			} else {
				$.infobox("获取相片失败，请稍后重试！");
			}
		},
		error : function(r) {
			$.showTips.hide();
			if (photo.checkSession(r))
				return;
			$.infobox('获取相片失败，请稍后重试！');
		}
	});
};

/**显示相片*/
photo.displayAlbumPhotoes = function(albumid,list){
	photo.copyArr(photo.photolist, list);
	photo.copyArr(photo.pptData, list);
	var html = new StringBuffer();
	$.each(list,function(i,v){
		html.append(photo.generateAlbumPhotoItem(v));
	});
	$("#photoList .toolbar .ui_checkbox input").checked(false);
	$("#photoList .toolbar .picnumber").text(photo.picmun);
	$("#photoList .toolbar .deleteallpic").addClass("disable");
	$("#photoList .toolbar .batchdownpic").addClass("disable");
	$("#photoList .toolbar .ui_menu").addClass("disable");
	$("#zdxPhoto").empty().append(html.toString()).find(".mask img").lazyload();

	$("#zdxPhoto li .mask").hover(function(){
		var t =$(this), model=$('#zdxPhoto').is('.x-show');
		if(model){
			t.find(".x-show-mask").show();
		}else{
			if(t.hasClass("choosepic") == 0)
				t.find(".hoverTips").show();
		}
	},function(){
		$(this).find(".hoverTips,.x-show-mask").hide();
	}).click(function(event){
		var t=$(this), model=$('#zdxPhoto').is('.x-show');
		if(model){
			var et=$(event.target);
			if(et.is('.x-show-mask')){
				var t = $(this), li = t.parent().index();
				location.href = "detail.html?albumId="+photo.curAlbum+"&pi="+(li+photo.start);
			}else if(et.is('.down') || et.is('.share') || et.is('.del') ){
				return true;
			} else {// IE6
				var t = $(this), li = t.parent().index();
				location.href = "detail.html?albumId="+photo.curAlbum+"&pi="+(li+photo.start);
			}
			return false;
		}else{
			photo.selectPhoto(t);
			return false;
		}
	}).next().bind("click",function(){
		var t = $(this), li = t.parent().index();
		location.href = "detail.html?albumId="+photo.curAlbum+"&pi="+(li+photo.start);
		return false;
	});
	var html = $("html"), pl = $("#photoList");
	if( html.height() - 88 > $("#zdxPhoto").height() + 111 ) {
		pl.height( html.height() - 88 );
	} else {
		pl.height( $("#zdxPhoto").height() + 111 );
	}
	
	$(window).resize(function(){
		var doc = $("html"), pl = $("#photoList"), ul = $("#zdxPhoto");
		if(doc.height() - ul.height() > 200){
			pl.css("height",(doc.height()-89)+"px");
		}
	});
	

	photo.setMinSize();
};

/**组装照片墙数据*/
photo.generateAlbumPhotoItem = function(v){
	photo.idMap[v.id] = v;
	var ti = "", html = new StringBuffer(),
		img = '<img data-original="'+photo.formatUrl(v.thumbnail)+'" width="204" height="204" src="/static/skin/pim2/img/blank.gif"/>',
		downUrl = photo.downName(photo.formatUrl(v.downurl), v.name);
	html.append('<li photoid="'+v.id+'" photoname="'+v.name+'" onselectstart="return false;">');
	html.append('<div class="mask">');
	html.append(img);
	if ( v.mediaType == 1 ) {
		html.append('<div class="listVideoMask"></div>');
	}
	html.append('<div class="x-show-mask"><div class="opts"><a target="newDownIframe" href="'+downUrl+'" class="down" title="下载"></a>');
	html.append('<a href="#" class="share" onclick="photo.shareDialog('+v.id+',\''+v.name+'\',\''+encodeURIComponent(photo.formatUrl(v.url))+'\');return false;" title="分享"></a>');
	html.append('<a href="#" class="del" onclick="photo.delPhoto('+v.id+');return false;" title="删除"></a></div></div>');
	html.append('<div class="newMask"></div>');
	html.append('<div class="hoverTips"><div></div><a href="#">选择</a>');
	html.append('</div>');
	html.append('</div><a class="name" href="#" title="查看相片详情">'+photo.getLeft(v.name,18)+'</a></li>');
	return html.toString();
};

/**选择相片*/
photo.selectPhoto=function(t) {
	t = t.closest("li");
	var id = t.attr("photoid");

	var sel=$("#zdxPhoto li .mask");
	if(sel.hasClass("choosepic")){
		$("#zdxPhoto .toolbar .checkbox .ui_radio input").checked(false);
	}
	if(t.find(".mask").hasClass("choosepic")){
		t.find(".hoverTips").show();
	} else {
		t.find(".hoverTips").hide();
	}

	var checknum = $("#zdxPhoto li").length;

	var tb=$("#photoList .toolbar");

	if(t.find(".mask").hasClass("choosepic")){
		t.find(".mask").removeClass("choosepic");
		t.find(".newMask").hide();

		photo.picmun -- ;
		$("#photoList .toolbar .picnumber").text(""+ photo.picmun +"");

		tb.find(".ui_checkbox input").checked(false);
		if(photo.picmun == 0){
			tb.find(".batchdownpic,.deleteallpic,.ui_menu").addClass("disable");
		}else{
			var menu = tb.find(".ui_menu");
			tb.find(".batchdownpic,.deleteallpic").removeClass("disable");
			if(!menu.hasClass("noalbum")){
				menu.removeClass("disable");
			}
			tb.find(".checkbox .ui_radio input").checked(false);
		}

	}else{
		t.find(".mask").addClass("choosepic");
		t.find(".newMask").show();

		photo.picmun ++ ;
		tb.find(".picnumber").html(""+ photo.picmun +"");
		if(photo.picmun == checknum){
			tb.find(".ui_checkbox input").checked(true);
		} else {
			tb.find(".ui_checkbox input").checked(false);
		}

		if(photo.picmun == 0){
			tb.find(".deleteallpic,.batchdownpic,.ui_menu").addClass("disable");
		}else{
			tb.find(".deleteallpic,.batchdownpic").removeClass("disable");
			var menu = tb.find(".ui_menu");
			if(!menu.hasClass("noalbum")){
				menu.removeClass("disable");
			}
		}
	}
	return false;
};

/**照片墙分页数据*/
photo.setPage = function(offset){
	photo.start = offset;
	if(photo.totalCount == 0){
		$(".pages .p-first").addClass("disable p-first_disable");
		$(".pages .p-prev").addClass("disable p-prev_disable");
		$(".pages .p-next").addClass("disable p-next_disable");
		$(".pages .p-last").addClass("disable p-last_disable");
		$("#zdxPhoto").hide();
		$("#photoList .none").css("display","block");
		$('#photoList .toolbar .pages .p-text').html('0/0');
		return;
	}

	if(photo.start==0){//判断是否是第一页
		$(".pages .p-first").addClass("disable p-first_disable");
		$(".pages .p-prev").addClass("disable p-prev_disable");
	}else{
		$(".pages .p-first").removeClass("disable p-first_disable");
		$(".pages .p-prev").removeClass("disable p-prev_disable");
	}

	if(photo.start + photo.count >= photo.totalCount){
		$(".pages .p-next").addClass("disable p-next_disable");
		$(".pages .p-last").addClass("disable p-last_disable");
	}else{
		$(".pages .p-next").removeClass("disable p-next_disable");
		$(".pages .p-last").removeClass("disable p-last_disable");
	}

	var pageNum=((photo.totalCount+photo.count-1)/photo.count)>>0;
	photo.totalPage = pageNum;
	var pageIndex=((photo.start/photo.count)>>0)+1;
	$('#photoList .toolbar .pages .p-text').html(pageIndex+'/'+pageNum);
}

/**分页事件*/
photo.bindPageAction = function() {
	photo.getShareBindData();

	$('#photoList .toolbar .taggle').click(function(event){
		var p=$('#zdxPhoto');
		p.toggleClass('x-show');

		var t=$(this);
		if(t.toggleClass('exit-manager').is('.exit-manager')){
			t.html('<b></b>退出管理');
			$('.photolist li:first .hoverTips').fadeIn('slow',function(){$(this).show();});
		}else{
			$("#photoList .toolbar .checkbox input").checked(false);

			$("#photoList .mask").removeClass("choosepic").find(".newMask,.hoverTips").hide();
			photo.picmun = 0;
			$("#photoList .toolbar .picnumber").text("0");
			$("#photoList .toolbar").find(".batchdownpic,.deleteallpic,.ui_menu").addClass("disable");

			t.html('<b></b>管理相片');
		}

		if(p.is('.x-show')){
			$('#photoList .toolbar .x-show-item').addClass('hide');
		}else{
			$('#photoList .toolbar .x-show-item').removeClass('hide').css('zoom',1);
		}

		return false;
	});

	$("#photoList .toolbar .pages a").bind("click",function(e){
		var t=$(this);
		if(t.is('.p-text'))
			return false;
		if(t.is(".disable")){
			return false;
		}
		if(t.is(".p-first") ) {
			photo.start = 0;
		} else if(t.is(".p-prev") ) {
			photo.start -= photo.count;
			photo.start = photo.start<0?0:photo.start;
		} else if(t.is(".p-next") ) {
			photo.start += photo.count;
		} else if(t.is(".p-last") ) {
			photo.start = (photo.totalPage-1) * photo.count;
			photo.start = photo.start<0?0:photo.start;
		} else {
			return false;
		}
		photo.getAllPhotoByAlbumId(photo.curAlbum, photo.count, photo.start);
		return false;
	});

	/**全选按钮事件*/
	$("#photoList .toolbar .checkbox input").bind("click",function(){
		var t = $(this),tb = $("#photoList .toolbar");
		if(!t.is(":checked")){
			$("#photoList .mask").removeClass("choosepic").find(".newMask").hide();
			photo.picmun = 0;
			$("#photoList .toolbar .picnumber").text("0");
			tb.find(".batchdownpic,.deleteallpic,.ui_menu").addClass("disable");
		} else {
			$('#photoList .hoverTips,#photoList .x-show-mask').hide();
			$("#photoList .mask").addClass("choosepic").find(".newMask").show();
			photo.picmun = $("#photoList .choosepic").length;
			$("#photoList .toolbar .picnumber").text(""+ photo.picmun +"");
			if(photo.picmun > 0){
				tb.find(".batchdownpic,.deleteallpic").removeClass("disable");
				var menu = tb.find(".ui_menu");
				if(!menu.hasClass("noalbum")){
					menu.removeClass("disable")
				}
			}
		}
	});

	/**照片墙*/
	$("#photoList .coltitle .btns .managerallpic").click(function(){
		location.href = photo.domain + "/portal/falls.html?albumId="+photo.curAlbum;
	});

	$("#photoList .toolbar .ui_menu").hover(function(){
		var t = $(this);
		if(!t.hasClass("disable")){
			t.find("menu").show().css('zoom', 1);
		}
	},function(){
		var t = $(this);
		if(!t.hasClass("disable")){
			t.find("menu").hide();
		}
	});

	$(window).scroll(function(){
		var sh = $(window).scrollTop(), ol = $(".coltitle").offset().left;
		if(sh > 88){
			if($.browser.msie){
				if($.browser.version == 7){
					$("#photoList .coltitle").css({"position":"fixed","top":"0px","left":ol+"px","width":"980px","z-index":"1"});
					$("#photoList .toolbar").css({"position":"fixed","top":"50px","left":ol+"px","width":"980px"});
				} else {
					$("#photoList .coltitle").css({"position":"fixed","top":"0px","left":ol+"px","width":"980px","z-index":"1"});
					$("#photoList .toolbar").css({"position":"fixed","top":"50px","left":ol+"px","width":"980px"});
				}
			} else {
				$("#photoList .coltitle").css({"position":"fixed","top":"0","width":"996px","z-index":"1"});
				$("#photoList .toolbar").css({"position":"fixed","top":"50px","width":"996px"});
			}
			$(".main .colmain ._fill").show();
		} else {
			$("#photoList .coltitle").css({"position":"static","width":"auto"});
			$("#photoList .toolbar").css({"position":"static","width":"auto"});
			$(".main .colmain ._fill").hide();
			if($.browser.msie && $.browser.version == 6){
				$("#photoList .toolbar").css({"position":"relative","width":"auto","left":0,"top":0});
			}
		}
	});
}

photo.setMinSize=function(){
	if($.browser.msie && $.browser.version == '6.0'){
		var c=$('.main .colmain').height('auto');
		var height=$('body').innerHeight()-88;
		var el=$('.main .widthwrap');
		if(height>c.innerHeight())
			el.height(height);
		else
			el.height('auto');
	}
};

/**照片墙删除相片*/
photo.deleteAllPic = function(){
	if($("#photoList .toolbar .deleteallpic").hasClass("disable")){
		return false;
	}else{
		photo.confirm('<b>您确定要删除选中的相片？</b><br/><b style="color: #ff0000;font-weight:normal;font-size: 12px;">相片删除后将无法恢复！</b>',function() {
			var ids = [];
			$("#zdxPhoto li .mask").each(function(){
				var t = $(this);
				if(t.hasClass("choosepic")){
					var li = t.parents('li'), id=li.attr("photoid");
					ids.push(id);
				}
			});
			photo.deleteSelectPhoto(ids);
		});
	}
};

/**删除照片墙选择相片*/
photo.deleteSelectPhoto = function(ids) {
	$.showTips.show();
	$.ajax({
		type : 'GET',
		url : photo.photoApi + '/v2/photodel?photoid='+ ids.join(","),
		dataType : 'json',
		success : function(j) {
			$.showTips.hide();
			if (j.result == 0){
				$.infobox('删除相片成功', true);
				$("#photoList .toolbar .ui_checkbox input").checked(false);
				var tb = $("#photoList .toolbar");
				tb.find(".picnumber").text("0");
				tb.find(".batchdownpic,.deleteallpic").addClass("disable");
				photo.picmun = 0;

				if(ids.length == $("#zdxPhoto li").length && photo.totalCount - ids.length == photo.start && photo.start > 0){
					photo.start -= photo.count;
				}
				photo.getAllPhotoByAlbumId(photo.curAlbum, photo.count, photo.start);
			}else{
				$.infobox("删除相片失败");
			}
		},
		error : function(req) {
			$.showTips.hide();
			if (photo.checkSession(req)){return;}
			if (req.status == 200 || req.status == 0){return;}
			$.infobox('删除相片失败');
		}
	});
};

// 分享相片对话框
photo.shareDialog = function(id, name, imgUrl) {
	if(name.toLowerCase().indexOf("bmp")+3 == name.length){
		$.infobox("该相片为bmp格式，新浪及腾讯微博不支持该格式的分享.");
		return;
	}
	if($("#photoList .photolist li[photoid='+id+']").is('.x-shareing')){
		$.infobox("正在分享请稍候...");
		return false;
	}
	imgUrl = decodeURIComponent(imgUrl);

	if (photo.shareBindData != undefined) {
		if (!photo.shareto) {
			photo.shareto = $(".hidecode .shareto").dialog();
			photo.shareto.find(".btns input[type='reset']").click(function(e) {
				photo.shareto.hide();
			});

			photo.shareto.find(".sns a").bind("click",function() {
				if ($(this).data('state') == 1) {
					$(this).toggleClass("curr");
				} else {
					var t = $(this), cn = t.attr('class'), type = (t.is('.qq') ? 'qq' : (t.is('.sina') ? 'sina' : (t.is('.sohu') ? 'sohu' : '')));
					photo.confirm("您还没绑定此微博,现在去绑定吗?",function() {
						for ( var i = 0, ss = photo.shareBindData, len = ss.length; i < len; i++) {
							if (cn.indexOf(ss[i].type) != -1) {
								window.open(photo.shareDomain + '/v2/authurl?type=' + type + '&context=' + encodeURIComponent(location.href));
								return;
							}
						}
					});
				}
			});

			photo.shareto.find(".btns input[type=submit]").click(function() {
				var checked = $(".shareto .sns a.curr");
				if (checked.length == 0) {
					$.infobox("您还没选定分享到的微博");
					return false;
				}
				if (checked.data('state') != 1) {
					photo.confirm("您还没绑定选中微博,现在去绑定吗?",function() {
						location.href = photo.contact + '/contact/portal/user/setting.html?do=share';
					});
					return false;
				}
				var sTarget = [];
				for ( var i = 0, len = checked.length; i < len; i++) {
					var c = $(checked[i]);
					if (c.is('.qq'))
						sTarget.push('qq');
					else if (c.is('.sina'))
						sTarget.push('sina');
					else if (c.is('.sohu'))
						sTarget.push('sohu');
				}
				var share = {
					target : sTarget.join(','),
					content : $(".shareto textarea").val(),
					resId : photo.shareto.photoId || id,
					resClass : "CLOUDPHOTO",
					imgUrl : photo.shareto.imgUrl || imgUrl
				};

				photo.shareData(photo.curAlbum, share, photo.shareCallback);
				photo.shareto.hide();
				return false;
			});
		}
		photo.shareto.photoId = id;
		photo.shareto.imgUrl = imgUrl;
		var status = 0;
		for ( var i = 0, len = photo.shareBindData.length; i < len; i++) {
			if (!photo.shareBindData[i].expired) {
				status = 1;
				photo.shareto.find('.' + photo.shareBindData[i].type).removeClass('disable').addClass("curr").data('state', 1);
			}
		}
		photo.shareto.find("dialog").data({"p" : id});
		photo.shareto.find("dialog textarea").val(decodeURIComponent(name) + " 这是我拍摄的照片哦，请大家跟我一起分享吧！来自@联想云服务");
		photo.shareto.show();
	} else {
		$.infobox("获取分享数据失败,请重试");
	}
};

//region 分享回调函数
function shareAuthCallback(childWindow, j) {
	childWindow.close();
	if (j && j.result == 0) {
		var p = photo, ss = p.shareBindData, dd = j.data, type = dd.type;
		p.shareto.find(".sns ." + type).removeClass('disable').toggleClass("curr").data('state', 1);
		for ( var i = 0, len = ss.length; i < len; i++) {
			if (ss[i].type == type) {
				ss[i] = p.copy(dd);
			}
		}
		$.infobox('绑定微博成功', true);
	} else if(j.result==401){
		photo.checkSession({status:401});
	}else{
		$.infobox('绑定微博失败,请重试');
	}
};

// 获取分享微博信息
photo.getShareBindData = function(callback) {
	$.ajax({
		type : 'GET',
		dataType : 'json',
		url : photo.shareDomain + '/v2/token/list?t=' + new Date().getTime(),
		success : function(j) {
			if (j.result == 0)
				photo.setShareStatus(j.data);
			else
				$.infobox('加载数据失败');
		},
		error : function(req) {
			if (photo.checkSession(req))
				return;
			if (req.status == 200 || req.status == 0)
				return;
			$.infobox('加载数据失败');
		}
	});
};

// 设置分享状态
photo.setShareStatus = function(binddata) {
	if (typeof binddata != "undefined") {
		photo.shareBindData = binddata;
	} else {
		$.infobox("获取分享数据失败,请重试");
	}
};

photo.clearShareTag = function(aid, pid) {
	$('#alb-phs' + aid + ' li[photoid=' + pid + ']').removeClass('x-shareing');
	return false;
};
// 分享数据
photo.shareData = function(photoId, shareData, callBack) {
	$('#alb-phs' + photoId + ' li[photoid=' + shareData.resId + ']').addClass(
			'x-shareing');

	var url = photo.shareDomain + "/v2/share/photo?type=" + shareData.target;
	var text = shareData.content.replace(/[\r]/g, '\\r')
			.replace(/[\n]/g, '\\n').replace(/"/g, '\\"');
	text = text.replace(/"/g, '\\"');
	$.ajax({
		type : 'POST',
		url : url,
		data : '{"img_url":"' + shareData.imgUrl + '","content":"' + text + '"}',
		dataType : 'json',
		success : function(j) {
			photo.clearShareTag(photoId, shareData.resId);
			photo.shareCallback(j, shareData.target);
		},
		error:function(r){
			if(photo.checkSession(r))return;
			$.infobox('分享失败,请重试！');
		},
		dataType : 'json'
	});
	$.infobox('分享正在进行中,请稍等...', true);
};

// 获取分享回调函数
photo.shareCallback = function(res, target) {
	if (res.result == 0)
		$.infobox('分享成功', true);
	else if (res.error)
		$.infobox(res.error);
	else if (res.result == 1) {
		if (res.expired) {
			if (target.indexOf(',') == -1) {
				for ( var i = 0, sb = photo.shareBindData, len = sb.length; i < len; i++) {
					if (sb[i].type == target) {
						sb[i].expired = true;
						photo.shareto.find('.' + sb.type).addClass('disable').toggleClass("curr").data('state', 0);
						break;
					}
				}
			} else
				photo.getShareBindData();
			$.infobox('绑定的微博已经过期,请重新绑定');
		} else
			$.infobox('分享失败');
	} else
		$.infobox('分享失败');
};