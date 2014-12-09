/**
 * Created by nhn on 2014/12/9.
 */

process.stdin.setEncoding('utf8');

process.stdin.on('readable', function() {
    var chunk = process.stdin.read();
    if (chunk !== null) {
        process.stdout.write('data: ' + chunk);
    }
});

process.stdin.on('end', function() {
    process.stdout.write('end');
});

process.on('SIGINT', function () {
   console.log("process exit...");
});