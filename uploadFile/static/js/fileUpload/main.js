$('input[type="submit"]').click(function () {
	var file = $('input[type="file"]');

	if (!file.val()) {
		alert('Please choose file to upload');
		return false;
	}
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