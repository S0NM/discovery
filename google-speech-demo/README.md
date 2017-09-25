# Running Note

Created by **SonM** 
Created Date: 25/09/2017
Last Updated: 25/09/2017

This project contains some example of using Web Audio API
### 1.Test Google Speech API (by uploading file)
Files
* Client: test-google-speech-v1.html
* Server: server/test-google-speech-v1-server.js

How to run
* Firstly, run ```server/test-google-speech-v1-server.js```
* Then test-google-speech-v1.html
* Select "short" speech wav file ( mono, bitrates:16000, time: <30s) to Upload
* Waiting 3-5s then BANG...AWESOME!

### 2.Test Google Speech API (streaming with microphone)
Files
* Client: test-google-speech-v2.html
* Server: server/test-google-speech-v2-server.js

How to run
* Firstly, run ```server/test-google-speech-v2-server.js```
* Then test-google-speech-v2.html
* Start "Click here to start"
* Say SOMETHING by using microphone
* Then....BANG...AWESOME!!

### 3. Test Google Speech API (using sox)
This is demo for [Performing Streaming Recognition by Google Speech API](https://cloud.google.com/speech/docs/streaming-recognize)
* Run ```streamingspeech.js```

**One more thing: If your appliction has interrupted without showing any error message**
Finding ```index.js``` of ```node-record-lpcm16``` and fix it:
```nodejs
 case 'sox':
    case 'rec':
    default:
      cmd = options.recordProgram
      cmdArgs = [
          '-q',                                     // show no progress
          '-t', 'waveaudio',                        // input-type
          '-d',                                     // use default recording device
          '-r', options.sampleRate.toString(),      // sample rate
          '-c', '1',                                // channels
          '-e', 'signed-integer',                   // sample encoding
          '-b', '16',                               // precision (bits)
          '-t', 'raw',                              // output-type
          '-'                                       // pipe
      ]
      break
    // On some systems (RasPi), arecord is the prefered recording binary
```

**The Sun never knew how greate it was until it hit the side of a building**
**~Louis Kahn!**
