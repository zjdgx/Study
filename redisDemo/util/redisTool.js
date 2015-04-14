var redis   = require('redis');
var client  = redis.createClient('6379', '127.0.0.1');

module.exports
// redis 链接错误
client.on("error", function(error) {
    console.log(error);
});
// redis 验证 (reids.conf未开启验证，此项可不需要)
client.auth("foobared");
client.select('15', function(error){
    if(error) {
        console.log(error);
    } else {
        // set
        client.set('str_key_0', '0', function(error, res) {
            if(error) {
                console.log(error);
            } else {
                console.log(res);
            }

            // 关闭链接
            client.end();
        });
    }
});
client.select('15', function(error){
    if(error) {
        console.log(error);
    } else {
        // get
        client.get('str_key_0', function(error, res){
            if(error) {
                console.log(error);
            } else {
                console.log(res);
            }

            // 关闭链接
            client.end();
        });
    }
});
client.select('15', function(error){
    if(error) {
        console.log(error);
    } else {
        // hmset
        var info = {};
        info.baidu = 'www.baidu.com';
        info.sina  = 'www.sina.com';
        info.qq    = 'www.qq.com';
        client.hmset('site', info, function(error, res){
            if(error) {
                console.log(error);
            } else {
                console.log(res);
            }

            // 关闭链接
            client.end();
        });
    }
});
client.select('15', function(error){
    if(error) {
        console.log(error);
    } else {
        // hmget
        client.hmget('site', 'baidu', function(error, res){
            if(error) {
                console.log(error);
            } else {
                console.log(res);
            }

            // 关闭链接
            client.end();
        });
    }
});
client.select('15', function(error){
    if(error) {
        console.log(error);
    } else {
        // hgetall
        client.hgetall('site', function(error, res){
            if(error) {
                console.log(error);
            } else {
                console.log(res);
            }

            // 关闭链接
            client.end();
        });
    }
});
client.select('15', function(error){
    if(error) {
        console.log(error);
    } else {
        // lpush
        client.lpush('list', 'key_0');
        client.lpush('list', 'key_1');
        client.end();
    }
});
client.select('15', function(error){
    if(error) {
        console.log(error);
    } else {
        // lrange
        client.lrange('list', '0', '-1', function(error, res){
            if(error) {
                console.log(error);
            } else {
                console.log(res);
            }

            // 关闭链接
            client.end();
        });
    }
});