/**
 * Build Date: 2016/06/29 10:49.
 * Copyright (c): ZJDGX
 * Autor: ZJDGX
 * Description: webpack config file.
 */
 
var path = require('path'),
		webpack = require('webpack');
		ExtractTextPlugin = require('extract-text-webpack-plugin'),
		vue = require('vue-loader');
		
module.exports = {
	entry: [
		'./src/main.js'
	],
	output: {
		path: 'build',
		filename: '[name].js',
		publicPath: __dirname + '/build/',
		chunkFilename: '[id].[name].js?[chunkhash]'
	},
	module: {
		loaders: [
			{
				test: /\.vue$/,
				loader: 'vue'
			},
			{
				test: /\.(css|styl)$/,
				loader: ExtractTextPlugin.extract('style', '!css!style!stylus')
			},
			{
				test: /\.(png|jpg)$/,
				loader: 'url?limit=40000'
			}
		]
	},
	vue: {
		css: ExtractTextPlugin.extract('css'),
		stylus: ExtractTextPlugin.extract('css!stylus')
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('common.js'),
		new ExtractTextPlugin('style.css'),
		// 使用ProvidePlugin加载使用率高的依赖库
		new webpack.ProvidePlugin({
			$: 'webpack-zepto'
		})
	]
}