#第1章 React简介

- React在每次请求后都会重新渲染整个页面

#第2章 JSX
    
- 子节点：React将开始标签和结束标签之间的所有子节点保存在this.props.children中.
- 非DOM属性：key, ref, dangerouslySetInnerHTML
	- ref: 允许父组件在render方法之外保持对子组件的一个引用
		```
		render: function () {
			return <div>
				<input ref="myInput" ..../>
			</div>;
		}
		```
		
		然后可以在组件的任何地方使用this.refs.myInput获取引用.