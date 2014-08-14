(function(window) {
    var tones = {
        context: new (window.AudioContext || window.webkitAudioContext)(),
        attack: 1,
        release: 100,
        volume: 1,
        type: "sine",


        playFrequency: function(freq) {
            this.attack = this.attack || 1;
            this.release = this.release || 1;
            var envelope = this.context.createGain();
            envelope.gain.setValueAtTime(this.volume, this.context.currentTime);
            envelope.connect(this.context.destination);

            envelope.gain.setValueAtTime(0, this.context.currentTime);
            envelope.gain.setTargetAtTime(this.volume, this.context.currentTime, this.attack / 1000);
            if(this.release) {
                envelope.gain.setTargetAtTime(0, this.context.currentTime + this.attack / 1000, this.release / 1000);
                setTimeout(function() {
                    osc.stop();
                    osc.disconnect(envelope);
                    envelope.gain.cancelScheduledValues(tones.context.currentTime);
                    envelope.disconnect(tones.context.destination);

                }, this.attack * 10 + this.release * 10);
            }

            var osc = this.context.createOscillator();
            osc.frequency.setValueAtTime(freq, this.context.currentTime);
            osc.type = this.type;
            osc.connect(envelope);
            osc.start();
        },

        /** 
         * Usage: 
         * notes.play(440);     // plays 440 hz tone
         * notes.play("c");     // plays note c in default 4th octave
         * notes.play("c#");    // plays note c sharp in default 4th octave
         * notes.play("eb");    // plays note e flat in default 4th octave
         * notes.play("c", 2);  // plays note c in 2nd octave
         */
        play: function(freqOrNote, octave) {
            if(typeof freqOrNote === "number") {
                this.playFrequency(freqOrNote);
            }
            else if(typeof freqOrNote === "string") {
                if(octave == null) {
                    octave = 4;
                }
                this.playFrequency(this.map[octave][freqOrNote.toLowerCase()]);
            }
        },

        getTimeMS: function() {
            return this.context.currentTime * 1000;
        },

        map: [{
            // octave 0
            "c": 16.351,
            "c#": 17.324,
            "db": 17.324,
            "d": 18.354,
            "d#": 19.445,
            "eb": 19.445,
            "e": 20.601,
            "f": 21.827,
            "f#": 23.124,
            "gb": 23.124,
            "g": 24.499,
            "g#": 25.956,
            "ab": 25.956,
            "a": 27.5,
            "a#": 29.135,
            "bb": 29.135,
            "b": 30.868
        },
        {
            // octave 1
            "c": 32.703,
            "c#": 34.648,
            "db": 34.648,
            "d": 36.708,
            "d#": 38.891,
            "eb": 38.891,
            "e": 41.203,
            "f": 43.654,
            "f#": 46.249,
            "gb": 46.249,
            "g": 48.999,
            "g#": 51.913,
            "ab": 51.913,
            "a": 55,
            "a#": 58.27,
            "bb": 58.27,
            "b": 61.735
        },
        {                    
            // octave 2
            "c": 65.406,
            "c#": 69.296,
            "db": 69.296,
            "d": 73.416,
            "d#": 77.782,
            "eb": 77.782,
            "e": 82.407,
            "f": 87.307,
            "f#": 92.499,
            "gb": 92.499,
            "g": 97.999,
            "g#": 103.826,
            "ab": 103.826,
            "a": 110,
            "a#": 116.541,
            "bb": 116.541,
            "b": 123.471
        },
        {                    
            // octave 3
            "c": 130.813,
            "c#": 138.591,
            "db": 138.591,
            "d": 146.832,
            "d#": 155.563,
            "eb": 155.563,
            "e": 164.814,
            "f": 174.614,
            "f#": 184.997,
            "gb": 184.997,
            "g": 195.998,
            "g#": 207.652,
            "ab": 207.652,
            "a": 220,
            "a#": 233.082,
            "bb": 233.082,
            "b": 246.942
        },
        {                    
            // octave 4
            "c": 261.626,
            "c#": 277.183,
            "db": 277.183,
            "d": 293.665,
            "d#": 311.127,
            "eb": 311.127,
            "e": 329.628,
            "f": 349.228,
            "f#": 369.994,
            "gb": 369.994,
            "g": 391.995,
            "g#": 415.305,
            "ab": 415.305,
            "a": 440,
            "a#": 466.164,
            "bb": 466.164,
            "b": 493.883
        },
        {                    
            // octave 5
            "c": 523.251,
            "c#": 554.365,
            "db": 554.365,
            "d": 587.33,
            "d#": 622.254,
            "eb": 622.254,
            "e": 659.255,
            "f": 698.456,
            "f#": 739.989,
            "gb": 739.989,
            "g": 783.991,
            "g#": 830.609,
            "ab": 830.609,
            "a": 880,
            "a#": 932.328,
            "bb": 932.328,
            "b": 987.767
        },
        {                    
            // octave 6
            "c": 1046.502,
            "c#": 1108.731,
            "db": 1108.731,
            "d": 1174.659,
            "d#": 1244.508,
            "eb": 1244.508,
            "e": 1318.51,
            "f": 1396.913,
            "f#": 1479.978,
            "gb": 1479.978,
            "g": 1567.982,
            "g#": 1661.219,
            "ab": 1661.219,
            "a": 1760,
            "a#": 1864.655,
            "bb": 1864.655,
            "b": 1975.533
        },
        {                    
            // octave 7
            "c": 2093.005,
            "c#": 2217.461,
            "db": 2217.461,
            "d": 2349.318,
            "d#": 2489.016,
            "eb": 2489.016,
            "e": 2637.021,
            "f": 2793.826,
            "f#": 2959.955,
            "gb": 2959.955,
            "g": 3135.964,
            "g#": 3322.438,
            "ab": 3322.438,
            "a": 3520,
            "a#": 3729.31,
            "bb": 3729.31,
            "b": 3951.066
        },
        {                    
            // octave 8
            "c": 4186.009,
            "c#": 4434.922,
            "db": 4434.922,
            "d": 4698.636,
            "d#": 4978.032,
            "eb": 4978.032,
            "e": 5274.042,
            "f": 5587.652,
            "f#": 5919.91,
            "gb": 5919.91,
            "g": 6271.928,
            "g#": 6644.876,
            "ab": 6644.876,
            "a": 7040,
            "a#": 7458.62,
            "bb": 7458.62,
            "b": 7902.132
        },
        {                    
            // octave 9
            "c": 8372.018,
            "c#": 8869.844,
            "db": 8869.844,
            "d": 9397.272,
            "d#": 9956.064,
            "eb": 9956.064,
            "e": 10548.084,
            "f": 11175.304,
            "f#": 11839.82,
            "gb": 11839.82,
            "g": 12543.856,
            "g#": 13289.752,
            "ab": 13289.752,
            "a": 14080,
            "a#": 14917.24,
            "bb": 14917.24,
            "b": 15804.264
        }]
    };

    // need to create a node in order to kick off the timer in Chrome.
    tones.context.createGain();

    if (typeof define === "function" && define.amd) {
        define(tones);
    } else {
       window.tones = tones;
    }

}(window));