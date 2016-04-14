# (2016/04/11) [webpack性能优化](http://www.cnblogs.com/giveiris/p/5237080.html)

## 文件过大

- 提取公用代码: (CommonsChunkPlugin) jquery、react等库文件

```
entry: {
	react: ['react'],
	jquery: ['jquery']
	...
},
plugins: [
	new CommonsChunkPlugin({
		name: ['jquery', 'react'],
		minChunks: Infinity // 提取所有entry共同依赖的模块
	})
]
```

- 代码压缩(UglifyJsPlugin)

```
new webpack.optimize.UglifyJsPlugin({
	compress: {
		warnings: false
	}
})
```

## 使用缓存

使用hash码缓存

```
output: {
	path: __dirname + '/release/',
	filename: '[chunkhash:8].[name].js',//8位hash缓存
	chunkFilename: '[name][chunkhash:8].js'
}
```

## 自动生成页面

- 生成带JS的页面

```
// 多个页面就多new几个HtmlWebpackPlugin
new HtmlWebpackPlugin({
	filename: 'page1.html',
	template: __dirname + '/src/app.html',
	inject: true,
	chunks: ['react', 'jquery', 'topic'],
	chunkSortMode: function (a, b) {// 排序
		var index = {'topic': 1, 'react': 3, 'jquery': 2},
			aI = index[a.origins[0].name],
			bI = index[b.origins[0].name];
			
		return aI && bI ? bI - aI : -1;
	}
})
```

- 生成带CSS的页面

```
new ExtractTextPlugin("comm.[contenthash:9].css")
```