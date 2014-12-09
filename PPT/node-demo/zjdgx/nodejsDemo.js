/** child process
 * ---------------------------------------------error
 * 实例一: 利用子进程获取系统内存使用情况
 *   url: http://www.educity.cn/java/677474.html
 *     date: 2014/12/09 22:25
 */
var spawn = require('child_process').spawn, 
	free = spawn('free', ['-m']); 

// 捕获标准输出并将其打印到控制台 
free.stdout.on('data', function (data) { 
	console.log('标准输出：\n' + data); 
}); 

// 捕获标准错误输出并将其打印到控制台 
free.stderr.on('data', function (data) { 
	console.log('标准错误输出：\n' + data); 
}); 

// 注册子进程关闭事件 
free.on('exit', function (code, signal) { 
	console.log('子进程已退出，代码：' + code); 
}); 