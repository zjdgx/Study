var path = require('path'),
		webpack = require('webpack'),
		ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
   entry: {
	   home: './public/javascript/pages/home.js'
   },
   output: {
      path: path.join(__dirname, 'dist'),
      filename: 'javascript/[name].js'
   },
   module: {
      loaders: [
        {
			test: /\.(css|styl)$/,
			loader: ExtractTextPlugin.extract('style', '!css!stylus')
		}
      ] 
   },
   plugins: [
      new ExtractTextPlugin('css/[name].css'),
	  new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
   ]
};