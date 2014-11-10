/**
 * learnyounode 2: baby steps
 * 	 node baby.js 1 2 3 5 6...
 */
var index = 2, sum = 0;
while(process.argv[index]) {
     sum += +process.argv[index++];
}
console.log(sum);
