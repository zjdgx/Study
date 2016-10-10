var webpack = require('webpack'),
		ExtractTextPlugin = require('extract-text-webpack-plugin');
		
module.exports = {
	entry: {index: './app.js'},
	output: {
		path: __dirname + '/dist',
		filename: 'js/[name].js'
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
				loaders: [
					//ExtractTextPlugin.extract('style', '!css!autoprefixer!stylus?')
					ExtractTextPlugin.loader({remove:true, extract: false}),
					"style-loader",
					ExtractTextPlugin.loader(),
					"css-loader",
					"autoprefixer-loader?browsers=last 2 version",
					"stylus-loader"
				]
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('css/[name].css')
	]
}