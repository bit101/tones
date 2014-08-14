

// ambient();
// scoredAmbient();
// song();
// interactive();
// physics();
piano();


////////////
// sounds
////////////

/*
  tone types:
  "sine",
  "square",
  "sawtooth",
  "triangle",
  "custom"
*/



function interactive() {
    var types = ["sine", "square", "sawtooth", "triangle"];
    var typeLabel = document.createElement("h3");
    typeLabel.textContent = "type: " + tones.type;
    document.body.appendChild(typeLabel);

    var typeSlider = document.createElement("input");
    typeSlider.type = "range";
    typeSlider.min = 0;
    typeSlider.max = 3;
    typeSlider.value = types.indexOf(tones.type);
    typeSlider.style.width = "500px";
    typeSlider.addEventListener("input", function() {
        tones.type = types[typeSlider.value];
        typeLabel.textContent = "type: " + tones.type;
    })
    document.body.appendChild(typeSlider);

    var attackLabel = document.createElement("h3");
    attackLabel.textContent = "attack: " + tones.attack;
    document.body.appendChild(attackLabel);

    var attackSlider = document.createElement("input");
    attackSlider.type = "range";
    attackSlider.min = 1;
    attackSlider.max = 300;
    attackSlider.value = tones.attack;
    attackSlider.style.width = "500px";
    attackSlider.addEventListener("input", function() {
        tones.attack = attackSlider.value;
        attackLabel.textContent = "attack: " + tones.attack;
    })
    document.body.appendChild(attackSlider);

    var releaseLabel = document.createElement("h3");
    releaseLabel.textContent = "release: " + tones.release;
    document.body.appendChild(releaseLabel);

    var releaseSlider = document.createElement("input");
    releaseSlider.type = "range";
    releaseSlider.min = 1;
    releaseSlider.max = 300;
    releaseSlider.value = tones.release;
    releaseSlider.style.width = "500px";
    releaseSlider.addEventListener("input", function() {
        tones.release = releaseSlider.value;
        releaseLabel.textContent = "release: " + tones.release;
    })
    document.body.appendChild(releaseSlider);

    ambient();
}


function ambient() {

    var timing = 250;
    var notes = [ "C#", "D#", "F#", "D#"];
    var prevTime = tones.getTimeMS();
    var elapsed = 0;

    play();


    function play() {
        var now = tones.getTimeMS();
        elapsed += now - prevTime;
        if(elapsed > timing) {
            while(elapsed > timing) elapsed -= timing;
            var note = notes[Math.floor(Math.random() * notes.length)];
            var octave = Math.floor(Math.random() * 10);
            tones.play(note, octave);
        }
        prevTime = now;
        requestAnimationFrame(play);
    }

}


function scoredAmbient() {
    tones.type = "triangle";
    tones.release = 300;

    var timing = 250;
    var notes = [ "C#", "D#", "F#", "D#"];

    score = [];
    for(var i = 0; i < 16; i++) {
        var note = notes[Math.floor(Math.random() * notes.length)];
        var octave = Math.floor(Math.random() * 10);
        console.log(i, ":", note, octave);
        score.push({
            note: note,
            octave: octave
        });
    }
    var index = 0;



    var prevTime = tones.getTimeMS();
    var elapsed = 0
    play();



    function play() {
        var now = tones.getTimeMS();
        elapsed += now - prevTime;
        if(elapsed > timing) {
            elapsed -= timing;
            var t = score[index];
            tones.play(t.note, t.octave);
            index++;
            index %= score.length;
        }
        prevTime = now;
        requestAnimationFrame(play);

    }

}

function song() {
    tones.type = "square";
    tones.attack = 20;
    tones.release = 200;

    var notes = "ccggaag-ffeeddc-ggffeed-ggffeed-ccggaag-ffeeddc-----",
        timing = 300,
        index = 0;

    var prevTime = tones.getTimeMS();
    var elapsed = 0
    play();



    function play() {
        var now = tones.getTimeMS();
        elapsed += now - prevTime;
        if(elapsed > timing) {
            elapsed -= timing;
            var note = notes.charAt(index);
            if(note !== "-") {
                tones.play(note);
            }
            index++;
            index %= notes.length;
        }
        prevTime = now;
        requestAnimationFrame(play);

    }
}

function physics() {
    var canvas = document.createElement("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    canvas.style.display = "block";
    document.body.style.margin = 0;
    document.body.appendChild(canvas);


    var balls = [],
        num = 8,
        gravity = 0.5;

    for(var i = 0; i < num; i++) {
        var size = Math.random();
        balls.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: Math.random() * 10 - 5,
            vy: Math.random() * 10 - 5,
            radius: 10 + size * 50,
            freq: 350 - size * 300
        })
    }

    play();

    function play() {
        context.clearRect(0, 0, width, height);
        for(var i = 0; i < num; i++) {
            var ball = balls[i];
            ball.x += ball.vx;
            ball.y += ball.vy;
            if(ball.x + ball.radius > width) {
                ball.x = width - ball.radius;
                ball.vx *= -1;
                tones.play(ball.freq);
            }
            else if(ball.x - ball.radius < 0) {
                ball.x = ball.radius;
                ball.vx *= -1;
                tones.play(ball.freq);
            }
            if(ball.y + ball.radius > height) {
                ball.y = height - ball.radius;
                ball.vy *= -1;
                if(Math.abs(ball.vy) > 2) 
                    tones.play(ball.freq);
            }
            else if(ball.y - ball.radius < 0) {
                ball.y = ball.radius;
                ball.vy *= -1;
                tones.play(ball.freq);
            }
            ball.vy += gravity;
            context.beginPath();
            context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
            context.fill();
        }



        requestAnimationFrame(play);
    }
}

function piano() {
    tones.attack = 0;
    tones.release = 300;
    tones.type = "sawtooth";
    // white
    var notes = ["c", "d", "e", "f", "g", "a", "b"];
    for(var i = 0; i < 7; i++) {
        makeKey(100 + i * 100, 100, 100, 500, "white", notes[i]);
    }
    // black
    makeKey(170, 100, 60, 275, "black", "c#");
    makeKey(270, 100, 60, 275, "black", "d#");
    makeKey(470, 100, 60, 275, "black", "f#");
    makeKey(570, 100, 60, 275, "black", "g#");
    makeKey(670, 100, 60, 275, "black", "a#");


    function makeKey(x, y, width, height, color, note) {
        var key = document.createElement("div");
        key.style.width = width + "px";
        key.style.height = height + "px";
        key.style.position = "absolute";
        key.style.left = x + "px";
        key.style.top = y + "px";
        key.style.backgroundColor = color;
        key.style.border = "solid 1px black";
        key.note = note;
        key.addEventListener("mousedown", function(event) {
            tones.play(event.target.note);
        });
        document.body.appendChild(key);

    }
}
