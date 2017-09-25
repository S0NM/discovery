//require libs for google speech api
const record = require('node-record-lpcm16');
const Speech = require('@google-cloud/speech');

// Instantiates a client
const speech = Speech();
const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'vi-VN';

const request = {
    config: {
        encoding: encoding,
        sampleRateHertz: sampleRateHertz,
        languageCode: languageCode
    },
    interimResults: false // If you want interim results, set this to true
};

// Create a recognize stream
const recognizeStream = speech.streamingRecognize(request)
    .on('error', console.error)
    .on('data', (data) =>
        $('#content').append(data.results[0] && data.results[0].alternatives[0])
                ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
                : `\n\nReached transcription time limit, press Ctrl+C\n`);

//===================Init Audio Context=============================
var audioContext = new (window.AudioContext || window.webkitAudioContext)();

//Check Supported
if (navigator.mediaDevices.getUserMedia){
    console.log('getUserMedia supported...');
    var constraints = { audio: true };
    var isStarted = false;

    function successCallback(stream){
        console.log('successCallback:....IN');
        var mediaStreamSource = audioContext.createMediaStreamSource(stream);

        // mediaStreamSource.connect(audioContext.destination);
        $('#btnStart').click(function () {
            isStarted = !isStarted;
            if (isStarted) {
                $('#btnStart').attr('value','Recording.....');
                mediaStreamSource.connect(audioContext.destination);
            } else {
                $('#btnStart').attr('value','Click here to start');
                mediaStreamSource.disconnect(audioContext.destination);
            }
            //Start audio streaming
        });
    }

    function errorCallback(error){
        console.log('errorCallback:',error);
    }

    navigator.webkitGetUserMedia(constraints,successCallback,errorCallback);
} else {
    console.log('getUserMedia not supported on your browser!');
}




