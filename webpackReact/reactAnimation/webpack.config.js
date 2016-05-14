var path = require('path'),
		webpack = require('webpack'),
		CopyWebpackPlugin = require('copy-webpack-plugin'),
		ExtractTextPlugin = require('extract-text-webpack-plugin');
		
module.exports = {
	entry: './index.js',
	output: {
		path: './dist',
		filename: 'index.js',
		publicPath: './dist'
	},
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
			},
			{
				test: /\.(css|styl)$/,
				loader: ExtractTextPlugin.extract('style', '!css!stylus')
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('css/components.css')
	]
}