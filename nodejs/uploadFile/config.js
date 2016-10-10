var server = {
	port : 8000,
	rootPath: __dirname,
	fileUploadPath: '/static/uploadFiles'
};

var require = {
	urlArgs: 'bust=<%= requireJSVersion %>',
	paths: {
		'async': 'node_modules/async/lib/async'
	}
}
exports.server = server;