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