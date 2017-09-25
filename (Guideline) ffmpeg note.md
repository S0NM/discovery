# Learning FFMPEG Note(s)

Created by **SonM** 
Created Date: 25/09/2017
Last Updated: 25/09/2017

### FFMPEG

| # | Description | Command|
|-----|--------|------|
|1|Show all support format|``` ffmpeg -formats | grep PCM ```|
|2|Converting mp3 to wav with bitrate of 16000, mono channel |``` ffmpeg -i sample.mp3 -acodec pcm_s16le -ar 16000 -ac 1 sample.wav ```|
|3|Clipping 6s from: 10 to 16 |``` ffmpeg -ss 10 -t 6 -i input.mp3 output.mp3 ```|
|4|Converting video to audio |``` ffmpeg -i input.mp4 output.avi ```|
|5|Convert to FLAC |``` ffmpeg -i short_sample.wav short_sample.flac ```|
|6|Show waveform |``` ffmpeg -i music.wav -filter_complex showwavespic=s=640x320 showwaves.png ```|

**The Sun never knew how greate it was until it hit the side of a building**
**~Louis Kahn!**
