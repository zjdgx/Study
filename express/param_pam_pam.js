/**
 * expressworks 6: PARAM PAM PAM
 *  create on 2014/11/11 nhn
 *   node param_pam_pam.js 8000
 */
//TODO: error
/*var express = require("express"),
    crypto = require("crypto"),
    app = express();

app.put("/message/:id", function(req, res){
    console.log("entered");
    var data = crypto.createHash("SHA1").update(new Date().toDateString()+req.params.id).digest("hex");
    res.send(data);
});

app.listen(8000);*/

var express = require('express')
var app = express()

app.put('/message/:id', function(req, res){
    var id = req.params.id
    var str = require('crypto')
        .createHash('sha1')
        .update(new Date().toDateString() + id)
        .digest('hex')
    res.send(str)
})

app.listen(process.argv[2])