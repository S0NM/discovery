//        var constraints = { audio: true };
//        var audioContext = new (window.AudioContext || window.webkitAudioContext)();
//        function successCallback(stream) {
//            console.log('successCallback:....IN');
//            var mediaStreamSource = audioContext.createMediaStreamSource(stream);
//            mediaStreamSource.connect(audioContext.destination);
//        }
//        function errorCallback(error){
//            console.log('errorCallback:',error);
//        }
//        navigator.webkitGetUserMedia(constraints,successCallback,errorCallback);

//==================================================
// var io = require('socket.io');
// var ss = require('socket.io-stream');
// var fs = require('fs');

//game logic here
// var welcome = document.getElementById("welcome");
var socket = io.connect('http://localhost:3555');
// var stream = ss.createStream();
// var filename = 'C:\sample_out.wav';
//
// ss(socket).emit('NHAN_FILE', stream, {name: filename});
// fs.createReadStream(filename).pipe(stream);

$('#file').change(function(e) {
    var file = e.target.files[0];
    var stream = ss.createStream();

    // upload a file to the server.
    ss(socket).emit('NHAN_FILE', stream, {size: file.size});
    ss.createBlobReadStream(file).pipe(stream);
});

socket.on('DICH_XONG',function(text){
    $('#transcript').append(text);
})


