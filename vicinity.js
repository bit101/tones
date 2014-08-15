require(["tones"], function(tones) {

    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        lines = document.getElementById("lines"),
        linesContext = lines.getContext("2d"),
        width = canvas.width = lines.width = window.innerWidth,
        height = canvas.height = lines.height = window.innerHeight,
        nodes = [],
        numNodes = 40,
        minDist = 200,
        maxRadius = 30,
        notes = "CDEFGAB",
        currentNode = null;

    tones.attack = 20;
    tones.release = 150;
    tones.type = "square";

    for(var i = 0; i < numNodes; i++) {
        var index = Math.floor(Math.random() * notes.length),
            note = notes.charAt(index);
        var node = {
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * (notes.length - index) * 5 + 10,
            note: note 
        };
        nodes.push(node);
    }
    drawNodes();

    setInterval(play, 1250);


    document.body.addEventListener("mousemove", function(event) {
        var x = event.clientX,
            y = event.clientY;

        linesContext.clearRect(0, 0, width, height);

        for(var i = 0; i < numNodes; i++) {
            var node = nodes[i],
                dx = node.x - x,
                dy = node.y - y,
                dist = Math.sqrt(dx * dx + dy * dy);

            if(dist < minDist) {
                var percent = dist / minDist;
                linesContext.beginPath();
                linesContext.strokeStyle = "rgba(0, 0, 0, " + (1 - percent + .1) + ")";
                linesContext.moveTo(x, y);
                linesContext.lineTo(node.x, node.y);
                linesContext.stroke();
                node.active = true;
            }
            else {
                node.active = false;
            }
        }
    });

    function play() {
        var delay = 0,
            count = 0;
        for(var i = 0; i < numNodes; i++) {
            var node = nodes[i];
            if(node.active) {
                playWithDelay(node, delay);
                delay += 250;
                if(++count > 4) return;
            }
        }

    }

    function playWithDelay(node, delay) {
        setTimeout(function() {
            // if(currentNode) {
            //     context.fillStyle = "black";
            //     draw(currentNode);
            // }
            drawNodes();
            currentNode = node;
            context.fillStyle = "rgba(255,0,0,0.5)";
            context.beginPath();
            context.arc(node.x, node.y, node.r / 2, 0, Math.PI * 2, false);
            context.fill();
            context.fillStyle = "black";
            tones.play(node.note);
        }, delay);
    }


    function drawNodes() {
        context.clearRect(0, 0, width, height);
        for(var i = 0; i < numNodes; i++) {
            draw(nodes[i]);
        }
    }

    function draw(node) {
        context.beginPath();
        context.arc(node.x, node.y, node.r, 0, Math.PI * 2, false);
        context.arc(node.x, node.y, node.r - 0.5, 0, Math.PI * 2, true);
        context.fill();
    }



});