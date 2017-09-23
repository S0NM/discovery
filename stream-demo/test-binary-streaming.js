//This tutorial: http://codewinds.com/blog/2013-08-19-nodejs-writable-streams.html
var crypto = require('crypto');
var fs = require('fs');

var wstream = fs.createWriteStream('binOutput.txt');
//Create random Buffer of 100 bytes
var buffer = crypto.randomBytes(100);
wstream.write(buffer);
wstream.end();


//Knowing when file has benn written
wstream.on('finish', function(){
    console.log('On_Finish: File has been written');
});