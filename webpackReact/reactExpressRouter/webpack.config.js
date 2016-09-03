var path = require('path'),
		webpack = require('webpack');
		
module.exports = {
	entry: './static/scripts/app.js',
	output: {
		path: './dist',
		filename: 'index.js',
		publicPath: './dist'
	},
	devTool: '#source-map',
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					plugins: ['transform-runtime'],
					presets: ['es2015', 'stage-0', 'react']
				}
			}
		]
	}
};