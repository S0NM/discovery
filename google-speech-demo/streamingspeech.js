const record = require('node-record-lpcm16');
const Speech = require('@google-cloud/speech');
const io = require('socket.io')(process.env.PORT || 3000);


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
        process.stdout.write(
            (data.results[0] && data.results[0].alternatives[0])
                ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
                : `\n\nReached transcription time limit, press Ctrl+C\n`));


io.on('connection', socket => {
    socket.on('BAT_DAU_THU_AM', data => {

    });

    socket.on('disconnect', () =>{

    });
});

//Stream from file
// fs.createReadStream(filename).pipe(recognizeStream);

// Start recording and send the microphone input to the Speech API
// record
//     .start({
//         sampleRateHertz: sampleRateHertz,
//         threshold: 0,
//         // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
//         verbose: false,
//         recordProgram: 'sox', // Try also "arecord" or "sox"
//         silence: '50.0',
//     })
//     .on('error', console.error)
//     .pipe(recognizeStream);

// console.log('Listening, press Ctrl+C to stop.');