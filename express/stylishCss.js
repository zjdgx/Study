/**
 * expressworks 5: stylish css
 *  create on 2014/11/11 nhn
 *   node stylishCss.js 8000
 *    index.html中使用main.css对应于main.styl
 */

var express = require("express"),
    app = express(),
    static_path = process.argv[3];

app.use(require("stylus").middleware(static_path));
//app.use(express.static(static_path));
// 设置静态文件请求路径都带static
app.use("/static", express.static(static_path));


app.listen(Number(process.argv[2]));