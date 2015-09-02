#problems
script标签的属性为text/jsx, 并且必须引入JSXTransformer.js文件
render里面必须返回一个ReactComponent: HTML标签 + 内容, 如果直接返回内容会报错

##react top-level api
Component | createClass | createElement | cloneElement | createFactory | render
unmountComponentAtNode | renderToString | renderToStaticMarkup | isValidElement | findDOMNode | DOM
PropTypes | initializeTouchEvents | Children | 