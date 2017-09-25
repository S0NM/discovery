var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var socket = io.connect('http://localhost:3555');

socket.on('DICH_XONG', function (text) {
    console.log('DICH XONG:', text);
    $('#transcript').append('<br>'+text);
})

//Check Supported
if (navigator.mediaDevices.getUserMedia) {
    console.log('getUserMedia supported...');
    var constraints = {
        audio: true
    };
    var options = {
        recorderType: StereoAudioRecorder,
        mimeType: 'audio/wav'
    };
    // var chunks = [];
    var isStarted = false;
    var ssStream = ss.createStream();

    //Test
    // var outStream = ss.createStream();

    function successCallback(stream) {
        console.log('successCallback:....IN');
        var input = audioContext.createMediaStreamSource(stream);
        var bufferSize = 2048;
        var scriptNode = audioContext.createScriptProcessor(bufferSize, 1, 1);
        scriptNode.onaudioprocess = scriptNodeProcess;
        input.connect(scriptNode);
        // scriptNode.connect(audioContext.destination);

        // var recordRTC = new RecordRTC(stream,options);
        console.log('ScriptNode BufferSize:', scriptNode.bufferSize);

        // recorder = new Recorder(input);

        function scriptNodeProcess(audioProcessingEvent) {
            var inputBuffer = audioProcessingEvent.inputBuffer;
            var outputBuffer = audioProcessingEvent.outputBuffer;
            var inputData = inputBuffer.getChannelData(0);
            var outputData = outputBuffer.getChannelData(0);

            // for (var channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
            //     var inputData = inputBuffer.getChannelData(channel);
            //     var outputData = outputBuffer.getChannelData(channel);

            // Loop through the 4096 samples
            for (var sample = 0; sample < inputBuffer.length; sample++) {
                // make output equal to the same as the input
                outputData[sample] = inputData[sample];
                // add noise to each output sample
                // outputData[sample] += ((Math.random() * 2) - 1) * 0.2;
            }
            // }
            // ssStream.write(new ss.Buffer(convertFloat32ToInt16(inputData)));//Working
            ssStream.write(new ss.Buffer(downsampleBuffer(inputData,44100,16000)));
            console.log(inputData)
        }

        // mediaStreamSource.connect(audioContext.destination);
        $('#btnStart').click(function () {
            isStarted = !isStarted;
            if (isStarted) {
                $('#btnStart').attr('value', 'Recording.....');
                scriptNode.connect(audioContext.destination);
                ss(socket).emit('NHAN_FILE', ssStream, {other: 'speechv2'});
            } else {
                $('#btnStart').attr('value', 'Click here to start');
                scriptNode.disconnect(audioContext.destination);
                ssStream.end();
                socket.emit('NGAT_KET_NOI',{});
            }
            //Start audio streaming
        });


        //Support Function
        function convertFloat32ToInt16(buffer) {
            l = buffer.length;
            buf = new Int16Array(l);
            while (l--) {
                buf[l] = Math.min(1, buffer[l]) * 0x7FFF;
            }
            return buf.buffer;
        }

        function downsampleBuffer(buffer, sampleRate, outSampleRate) {
            if (outSampleRate == sampleRate) {
                return buffer;
            }
            if (outSampleRate > sampleRate) {
                throw "downsampling rate show be smaller than original sample rate";
            }
            var sampleRateRatio = sampleRate / outSampleRate;
            var newLength = Math.round(buffer.length / sampleRateRatio);
            var result = new Int16Array(newLength);
            var offsetResult = 0;
            var offsetBuffer = 0;
            while (offsetResult < result.length) {
                var nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
                var accum = 0, count = 0;
                for (var i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
                    accum += buffer[i];
                    count++;
                }

                result[offsetResult] = Math.min(1, accum / count)*0x7FFF;
                offsetResult++;
                offsetBuffer = nextOffsetBuffer;
            }
            return result.buffer;
        }
    }

    function errorCallback(error) {
        console.log('errorCallback:', error);
    }

    navigator.webkitGetUserMedia(constraints, successCallback, errorCallback);
} else {
    console.log('getUserMedia not supported on your browser!');
}




