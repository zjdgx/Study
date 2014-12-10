var colors = require( "colors")


//使用 colors 模块
console.log('红色'.red);
console.log('绿色'.green);
console.log('下划线加白色'.underline.white)
console.log('反转颜色'.inverse);
console.log('彩虹色'.rainbow);
console.log("乱七八糟".zalgo);

//上面是通过扩展String的属性来使用,下面这种是调用方法
// 斜体这个方法在我电脑上不起作用.
console.log(colors.italic('斜体'));
console.log(colors.blue('蓝色'));


//自定义主题
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});
console.log("this is an error".error);
console.log("this is a warning".warn);



