/**
 * Created by zjdgx on 2014/12/03
 *   nodejs desx encrypt & decrypt
 */
var	content = '',
	title = '网易',
	fs = require('fs'),
	fileName = "./secret.txt",
	crypto = require('crypto');

if( content.length > 0 ) {
	fs.appendFile(fileName, title+zjdgxEncrypt("en",content)+"\n", function(err){
		if( err ) {
			console.log(err);
		}
	});
} else {
	fs.readFile(fileName, {encoding: "utf8"}, function (err, data) {
		if (err)
			throw err;
			
		var lines = data.toString().split("\n"), len = lines.length,
			result = "", index = -1;
			
		for(var i=0; i<len; i++) {
			index = lines[i].indexOf(title);
			
			if( index > -1 ) {
				result += zjdgxEncrypt( "des", lines[i].substring(lines[i].indexOf(":")+1))+"\n";
			}
			
			index = -1;
		}
		console.log(result);
	});
}

function zjdgxEncrypt( type, data ) {
	var  result;
	
	if( type === "en" ) {//加密
		var cipher = crypto.createCipher('desx','zjdgx');
		
		result = cipher.update(data,'utf8','hex');
		result += cipher.final('hex');
	} else {// 解密
		var decipher = crypto.createDecipher('desx','zjdgx');
		
		result = decipher.update(data,'hex','utf8');
		result += decipher.final('utf8');
	}
	
	return result;
}