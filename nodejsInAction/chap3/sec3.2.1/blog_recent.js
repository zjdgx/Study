/**
 * Nodejs In Action: section 3.2.1
 *  用回调处理一次性事件
 *  Created by zjdgx on 2014/11/25.
 */

var http = require("http"),
    fs = require("fs");

http.createServer(function(req,res){
    if(req.url == '/') {
        fs.readFile('./titles.json')
    }
})