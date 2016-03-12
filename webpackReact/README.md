##webpack介绍

###webpack浏览器自动刷新

```
entry: [
	'webpack/hot/dev-server',
	'webpack-dev-server/client?http://localhost:8080',
	path.resolve(__dirname, 'app/main.js')
],
```

###引入文件

####模块

- ES6模块: `import module from './module.js';`
- CommonJS: `var module = require('./module.js';`
- AMD: `define(['./module.js'], function (module) {});`

####理解文件路径

*相对路径是相对当前目录, 绝对路径是相对入口文件.*

##React

React的key属性可以保证DOM输出顺序

```
<ul>
{
	todoItems.map((todoItem, i) =>
		<li key={'todoitem' + i}><TodoItem owner={todoItem.owner} task={todoItem.task} /></li>
	)
}
</ul>
```

如果不加key属性, React会给出警告

*React提供了ReactLink来支持双向数据绑定*

使用Mixin实现数据双向绑定

```
// ReactLink 是一个插件，所以我们需要把它引入。
var React = require('react/addons');

...

module.exports = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    ...

    render() {
        var todoItems = this.state.todoItems;

        return <div>
            <div className='ChangeOwner'>
                <input type='text' valueLink={this.linkState('owner')} />// *此处不再需要onChange绑定了*
            </div>

            <div className='TodoItems'>
                <ul>{todoItems.map((todoItem, i) =>
                    <li key={'todoitem' + i}>
                        <TodoItem owner={owner} task={todoItem.task} />
                    </li>
                )}</ul>
            </div>
        </div>;
    },
});
```

###配置React

####在代码中使用React

```
import React from 'react';

export default class Hello extends React.Component {
  render() {
    return <h1>Hello world</h1>;
  }
}
```

###优化重合并

####在开发环境中使用压缩文件

为了不让webpack去遍历react及其所有依赖, 你可以在开发中重写它的行为

```
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');

config = {
    entry: ['webpack/hot/dev-server', path.resolve(__dirname, 'app/main.js')],
    resolve: {
        alias: {
          'react': pathToReact
        }
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel'
        }],
        noParse: [pathToReact]
    }
};

module.exports = config;
```

#####此配置做了两件事

- 每当react在代码中被引入, 它会使用压缩后的react文件, 而不是到node_modules中找;
- 每当webpack尝试支解析那个压缩后的文件, 我们阻止它, 因为这不必要.

####Flow

##CSS Fonts and Images

###加载CSS

####CSS加载准备
- 安装加载器: `npm install css-loader style-loader --save-dev`
- 修改配置:

```
{// 增加css-loader
	test: /\.css$/, // Only .css files
	loader: 'style!css' // Run both loaders
}
```

####加载CSS文件

`import './style.css';`

*在CommonJS和AMD中都可以用import加载CSS文件*

####CSS加载策略

- 所有CSS代码合并成一个文件
- 懒加载: 在每个入口点包含各自的CSS文件, 发挥多重入口文件的优势.

####使用内联样式取代CSS文件

```
import React from 'react';

var style = {
  backgroundColor: '#EEE'
};

export default React.createClass({
  render: function () {
    return (
      <div style={style}>
        <h1>Hello world</h1>
      </div>
    )
  }
});
```

###自动刷新CSS
###加载LESS和SASS
###内联images
###内联fonts
