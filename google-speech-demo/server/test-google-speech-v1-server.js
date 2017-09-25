//Server for test-google-speech-v1
const io = require('socket.io')(3555);
const ss = require('socket.io-stream');
const path = require('path');
const fs = require('fs');

console.log('Server is starting....DONE');
io.on('connection', function (socket) {
    // ============ Google Speech to Text====================
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
            socket.emit('DICH_XONG',(data.results[0] && data.results[0].alternatives[0])
                    ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
                    : `\n\nReached transcription time limit, press Ctrl+C\n`));

    console.log('Server Event:....CONNECT');
    // socket.on('NHAN_FILE', request).pipe(recognizeStream);
    ss(socket).on('NHAN_FILE', function (stream, size) {
        console.log('filesize:', size)
        stream.pipe(recognizeStream);
    });

    socket.on('disconnect', function () {
        console.log('Disconnected.....!');
    })
});