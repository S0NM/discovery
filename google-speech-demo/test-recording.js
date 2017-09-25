var audioContext = new (window.AudioContext || window.webkitAudioContext)();

//Check Supported
if (navigator.mediaDevices.getUserMedia){
    console.log('getUserMedia supported...');
    var constraints = { audio: true };
    var chunks = [];
    var isStarted = false;

    function successCallback(stream){
        console.log('successCallback:....IN');
        var input = audioContext.createMediaStreamSource(stream);
        recorder = new Recorder(input);

        // mediaStreamSource.connect(audioContext.destination);
        $('#btnStart').click(function () {
            isStarted = !isStarted;
            if (isStarted) {
                $('#btnStart').attr('value','Recording.....');
                recorder && recorder.record();
            } else {
                $('#btnStart').attr('value','Click here to start');
                recorder && recorder.stop();
                createDownloadLink();
                recorder.clear();
            }
            //Start audio streaming
        });

        //Generate download link for WAV recording
        function createDownloadLink() {
            recorder && recorder.exportWAV(function(blob) {
                var url = URL.createObjectURL(blob);
                var li = document.createElement('li');
                var au = document.createElement('audio');
                var hf = document.createElement('a');

                au.controls = true;
                au.src = url;
                hf.href = url;
                hf.download = new Date().toISOString() + '.wav';
                hf.innerHTML = hf.download;
                li.appendChild(au);
                li.appendChild(hf);
                recordingslist.appendChild(li);
            });
        }
    }

    function errorCallback(error){
        console.log('errorCallback:',error);
    }

    navigator.webkitGetUserMedia(constraints,successCallback,errorCallback);
} else {
    console.log('getUserMedia not supported on your browser!');
}




