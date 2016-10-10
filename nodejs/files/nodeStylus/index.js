/**
 * Build Date: 2016/08/18 16:06
 * Author: ZJDGX
 * Description: 
 * 	nodejs command line compile stylus
 */

//var stylus = require('accord').load('stylus');

/*stylus.render(file.contents.toString(enc || 'utf-8'), opts)
	.catch(function(err) {
		delete err.input;
		return cb(guErr(err));
	})
	.done(function(res) {
		if (res == null) {
			return;
		}
        
		if (res.result !== undefined) {
			//file.path = rext(file.path, '.css');
			//file.contents = new Buffer(res.result);
			
			console.log(res.result);
        }
	});*/
//var stylus = require('stylus');

var exec = require('child_process').exec;

var cmd = "stylus Loading.styl -o loading.css";

exec(cmd, function (error, stdout, stderr) {
	if (error) {
		console.log('error: ' + error);
	}
});