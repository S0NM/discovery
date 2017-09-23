//This tutorial: http://codewinds.com/blog/2013-08-19-nodejs-writable-streams.html
var fs = require('fs');

// //Using default encoding
// var wstream = fs.createWriteStream('myOutput.txt');
// wstream.write('Hello world!\n');
// wstream.write('Another line\n');
// wstream.end();


//Using utf16le encoding
var options = { encoding: 'utf16le' };
var wstream = fs.createWriteStream('myOutput_utf16.txt', options);
wstream.write('Hello world utf16\n', 'utf16le');
wstream.write('Another line\n','utf16le');
wstream.end();

