## (2016/03/30)stylus文件中引入第三方css

`@import '~normalize.css/normalize.css';`

## (2016/03/30)使用[react-es6-webpack-boilerplate](https://github.com/vasanthk/react-es6-webpack-boilerplate)搭建react+webpack框架

## (2016/03/30)webpack stylus独立css文件加载注意事项

- 安装loader: css-loader, style-loader, extract-text-webpack-plugin
- stylus文件必须使用require在js文件中引入: `require('./base.styl')`
- 在webpack.config.js文件中写独立css文件加载

```
var path = require('path'),
		ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
   entry: {
	   home: './public/javascript/pages/index.js'
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
      new ExtractTextPlugin('css/[name].css')
   ]
};
```