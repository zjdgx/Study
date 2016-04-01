var fs = require('fs'),
	path = require('path'),
	is = fs.createReadStream('C:/Users/nhn/AppData/Local/Temp/upload_ad13037382ffbd5bac61be066f8f18c8'),
	os = fs.createWriteStream(path.join('e:/projects/zjdgx/Study/uploadFile/static/uploadFiles/head1.jpg'));

	is.pipe(os);
	os.on('end', function (err) {
		console.log('file upload pipe end.');
		if (err) {
			console.log(JSON.stringify(err));
		} else {
			console.log('file upload unlinkSync started.');
		}
	});