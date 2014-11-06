var index = 2, sum = 0;
while(process.argv[index]) {
     sum += +process.argv[index++];
}
console.log(sum);
