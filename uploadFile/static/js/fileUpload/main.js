$('input[type="submit"]').click(function () {
	var file = $('input[type="file"]');

	if (!file.val()) {
		alert('Please choose file to upload');
		return false;
	}
});