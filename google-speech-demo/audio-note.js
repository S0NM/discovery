class Sound {
    constructor(context) {
        this.context = context;
    }

    init() {
        this.oscillator = this.context.createOscillator();
        this.gainNode = this.context.createGain();

        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
        this.oscillator.type = 'sine';
    }

    play(value, time) {
        this.init();

        this.oscillator.frequency.value = value;
        this.gainNode.gain.setValueAtTime(1, this.context.currentTime);

        this.oscillator.start(time);
        this.stop(time);

    }

    stop(time) {
        this.gainNode.gain.exponentialRampToValueAtTime(0.001, time + 1);
        this.oscillator.stop(time + 1);
    }
}

//Create sine Oscillator
let context = new (window.AudioContext || window.webkitAudioContext)();

var isStarted  = false;
$('#btnStart').click(function(){
    let note = new Sound(context);
    let now = context.currentTime;
    $('#content').append('<br> Clicked...');
    isStarted = !isStarted;
    if (isStarted){
        note.play(261.63, now);
    } else {
        note.play(293.66, now);
    }
    //Start audio streaming
});


