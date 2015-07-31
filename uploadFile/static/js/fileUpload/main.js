$('input[type="submit"]').click(function () {
	var file = $('input[type="file"]');

	if (!file.val()) {
		alert('Please choose file to upload');
		return false;
	}
});

$('.flashUpload').click(function() {
	var params = {
		useSize: '0',
		totalSize: '107374182400',
		uploadServerUrl : "/fileUpload",//上传响应页面(必须设置)
		loadComplete: '',
		nologinFunction: 'nologinWhenUpload',
		jsFunction : "getFileList",//上传成功后回调JS
		filter : "*.jpeg;*.gif;*.jpg;*.png"			//上传文件类型限制
	};
	console.log(123);
	swfobject.embedSWF("js/fileUpload/imagecut.swf", "image", "388", "272", "10.0.0", "js/fileUpload/expressInstall.swf", params, {wmode:"transparent"});
	$('.flashUploadContainer').show();
});

function uploadResult(result) {
	if (result === 0) {
		$.msgbox('File upload succeed...', function(){
			console.log(1);
		});
	}
}


function getFileList() {
	$.ajax({
		url: '/filelist',
		type: 'GET',
		dataType: 'JSON',
		success: function(zjdgx) {
			var html = "";
			for (var i=0; i<zjdgx.files.length; i++) {
				html += "<li><img src='"+zjdgx.files[i].path+"/"+zjdgx.files[i].fileName+"' width='300' height='120' /></li>";
			}
			$("#fileList").append(html);
		},
		error: function (error) {

		}
	})
}

$(function() {
	getFileList();
});