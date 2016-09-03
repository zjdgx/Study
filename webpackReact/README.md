OutsideClick.js

## (2016/04/12)使用[Clean](https://github.com/johnagan/clean-webpack-plugin)

- 安装clean模块

```
npm i --save-dev clean-webpack-plugin
```

- 添加配置

```
new CleanWebpackPlugin(['dist'], {
	dry: false, // do not delete anything, good for testing.
	verbose: true, // show the logs.
	root: __dirname // webpack.config file path.
})
```


## (2016/04/01)使用webpack + react + stylus + es6需要安装的模块

- style

`css-loader`, `style-loader`, `stylus`, `stylus-loader`

配置如下:

```
test: /\.(css|styl)/,
loader: ExtractTextPlugin.extract('style', '!css!stylus')
```

- javascript

`babel-core`, `babel-loader`, `babel-preset-es2015`, `babel-preset-react`

配置如下:

```
test: /\.(js|jsx)$/,
exclude: /node_modules/,
loader: 'babel',
query: {
	presets: ['es2015', 'react']
}
```

## (2016/03/31)在webpack中压缩文件

```
new webpack.optimize.UglifyJsPlugin({
	compress: {
		warnings: false
	}
})
```

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