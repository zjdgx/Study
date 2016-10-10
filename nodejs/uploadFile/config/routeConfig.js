var zjdgxFile = require('../lib/file/zjdgxFile');

exports.dispatch = function(app) {
	app.use('/filelist', zjdgxFile.filelist);
	app.post('/fileUpload', zjdgxFile.uploadFile);
};