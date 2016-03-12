/**
 * Build Date: 16/3/2 11:10.
 * Copyright (c): NHN China Co.,LTD
 * Author: ZJDGX
 * Description:
 */
 
 var path = require('path');
 
 module.exports = {
	entry: [
		'webpack/hot/dev-server',
		'webpack-dev-server/client?http://localhost:8080',
		path.resolve(__dirname, 'app/main.js')
    ],
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js?$/,
				loader: 'babel'
			}
		]
	}
 }