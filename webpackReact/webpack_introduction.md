## webpack介绍

### webpack浏览器自动刷新

```
entry: [
	'webpack/hot/dev-server',
	'webpack-dev-server/client?http://localhost:8080',
	path.resolve(__dirname, 'app/main.js')
]
```

### 引入文件

#### 模块

- ES6模块: `import module from './module.js';`
- CommonJS: `var module = require('./module.js';`
- AMD: `define(['./module.js'], function (module) {});`

#### 理解文件路径

*相对路径是相对当前目录, 绝对路径是相对入口文件.*

## React

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

### 配置React

#### 在代码中使用React

```
import React from 'react';

export default class Hello extends React.Component {
  render() {
    return <h1>Hello world</h1>;
  }
}
```

### 优化重合并

#### 在开发环境中使用压缩文件

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

##### 此配置做了两件事

- 每当react在代码中被引入, 它会使用压缩后的react文件, 而不是到node_modules中找;
- 每当webpack尝试支解析那个压缩后的文件, 我们阻止它, 因为这不必要.

#### Flow

## CSS Fonts and Images

### 加载CSS

#### CSS加载准备
- 安装加载器: `npm install css-loader style-loader --save-dev`
- 修改配置:

```
{// 增加css-loader
	test: /\.css$/, // Only .css files
	loader: 'style!css' // Run both loaders
}
```

#### 加载CSS文件

`import './style.css';`

*在CommonJS和AMD中都可以用import加载CSS文件*

#### CSS加载策略

- 所有CSS代码合并成一个文件
- 懒加载: 在每个入口点包含各自的CSS文件, 发挥多重入口文件的优势.

#### 使用内联样式取代CSS文件

```
import React from 'react';

var style = {
  backgroundColor: '# EEE'
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

### 自动刷新CSS

### 加载LESS和SASS

### 内联images

- 安装url-loader
- 添加loader

```
{
  test: /\.(png|jpg)$/,
  loader: 'url?limit=25000'
}
```

### 内联fonts

和内联images一样, 使用url-loader加载字体


## 部署策略

### 发布配置

- 在package.json中创建运行脚本

```
"scripts": {
    "dev": "webpack-dev-server --devtool eval --progress --colors --hot --content-base build",
    "deploy": "NODE_ENV=production webpack -p --config webpack.production.config.js"
}
```

- 创建生产配置

```
var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  entry: path.resolve(__dirname, 'app/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,

      // There is not need to run the loader through
      // vendors
      // 这里再也不需通过任何第三方来加载
      exclude: [node_modules_dir],
      loader: 'babel'
    }]
  }
};

module.exports = config;
```

- 运行项目
`npm run dev`

### 合并成单文件

#### 使用单入口模式的情况:

- 应用很小
- 很少会更新应用
- 你不太关心初始加载时间

### 分离应用和第三方

#### 分离依赖的情况:

- 当你的第三方的体积达到整个应用的 20% 或者更高的时候;
- 更新应用的时候只会更新很小的一部分;
- 你没有那么关注初始加载时间，不过关注优化那些回访用户在你更新应用之后的体验;
- 有手机用户.

```
var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  entry: {
    app: path.resolve(__dirname, 'app/main.js'),

    // Since react is installed as a node module, node_modules/react,
    // we can point to it directly, just like require('react');
    // 当 React 作为一个 node 模块安装的时候，
    // 我们可以直接指向它，就比如 require('react')
    vendors: ['react']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: [node_modules_dir],
      loader: 'babel'
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ]
};

module.exports = config;
```

### 多重入口

#### 使用多重入口情况:

- 你的应用有多种不同的用户体验，但是他们共享了很多代码;
- 你有一个使用更少组件的手机版本;
- 你的应用是典型的权限控制，你不想为普通用户加载所有管理用户的代码.

```
var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  entry: {
    app: path.resolve(__dirname, 'app/main.js'),
    mobile: path.resolve(__dirname, 'app/mobile.js'),
    vendors: ['react'] // 其他库
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js' // 注意我们使用了变量
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: [node_modules_dir],
      loader: 'babel'
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ]
};

module.exports = config;
```

### 懒加载入口文件

```
import React from 'react';
import Feed from './Feed.js';

class App extends React.Component {
  constructor() {
    this.state = { currentComponent: Feed };
  }
  openProfile() {
    require.ensure([], () => {
      var Profile = require('./Profile.js');
      this.setState({
        currentComponent: Profile
      });
    });
  }
  render() {
   return (
      return <div>{this.state.currentComponent()}</div>
    );
  }
}
React.render(<App/>, document.body);
```

### **同构渲染**

```
var webpack = require('webpack');
var path = require('path');
var node_modules_dir = path.join(__dirname, 'node_modules');

var deps = [
  'react/dist/react.min.js',
  'react-router/dist/react-router.min.js',
  'moment/min/moment.min.js',
  'underscore/underscore-min.js',
];

var config = {
  entry: ['webpack/hot/dev-server', './app/main.js'],
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {}
  },
  module: {
    noParse: [],
    loaders: []
  }
};

// Run through deps and extract the first part of the path, 
// as that is what you use to require the actual node modules 
// in your code. Then use the complete path to point to the correct
// file and make sure webpack does not try to parse it
// 通过在第一部分路径的依赖和解压
// 就是你像引用 node 模块一样引入到你的代码中
// 然后使用完整路径指向当前文件，然后确认 Webpack 不会尝试去解析它

deps.forEach(function (dep) {
  var depPath = path.resolve(node_modules_dir, dep);
  config.resolve.alias[dep.split(path.sep)[0]] = depPath;
  config.module.noParse.push(depPath);
});

module.exports = config;
```

## 进阶

### 优化开发
### 热加载组件
### 使用下一代javascript
### 优化缓存
### 匹配器
### 懒加载入口
### 创建一个复用代码
### 理解chunks
### 创建库