var path = require('path'),
		webpack = require('webpack'),
		poststylus = require('poststylus'),
		autoprefixer = require('autoprefixer'),
		CopyWebpackPlugin = require('copy-webpack-plugin'),
		ExtractTextPlugin = require('extract-text-webpack-plugin');
		
module.exports = {
	entry: './demo/scripts/index.js',
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
	devtool: 'source-map',
	stylus: {
		use: [
			poststylus([
				autoprefixer({browsers: ['ie 8']}),
				'rucksack-css'
			])
		]
	},
	plugins: [
		new ExtractTextPlugin('css/components.css'),
		new CopyWebpackPlugin([
			{from: './demo/image', to: 'image'}
		])
	]
}