const cnv = document.getElementById("canvas");
const ctx = cnv.getContext("2d");
let pos = []
const sprites = [];
let bldAmt = 0;
let loaded = 0;
let move = [];
let temp = false;

for(let i = 0; i < 4; i++) {
    let img = new Image(16, 16);
    img.addEventListener('load', function() {
        sprites[i] = img;
        loaded++;
        if(loaded >= 4) {
            intro();
        }
    })
    img.src = `assets/player${i}.png`;
}

ctx.font = "42px Verdana";
ctx.fillStyle = "#0000FF";

function intro() {
    ctx.beginPath();
    ctx.rect(0, 0, 1000, 600);
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeText("The goal of this game is to test as much blood as you can!", 5, 50, 995);
    ctx.fillStyle = "#FF0000";
    ctx.fillText("The goal of this game is to test as much blood as you can!", 5, 50, 995);
    ctx.fillStyle = "#0000FF";
    ctx.fillText("You can move with W, A, S, and D", 250, 342, 500);
    ctx.fillStyle = `rgba(255, 0, 0, ${Math.floor(Date.now()) / 1000 % 2})`;
    ctx.fillText("Press any button to start the game", 250, 550, 500);
    if(temp) {
        draw();
        return;
    }
    window.requestAnimationFrame(intro);
}

function draw() {
    ctx.beginPath();
    ctx.rect(0, 0, 1000, 600);
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.stroke();
    pos[0] += move[0] - move[0] * 2;
    pos[1] += move[1] - move[1] * 2;
    ctx.drawImage(sprites[bldAmt], pos[0], pos[1]);
    window.requestAnimationFrame(draw);
}

window.onkeydown = function(e) {
    switch(e.key) {
        case "w":
            moves[1]--;
            break;
        case "s":
            move[1]++;
            break;
        case "a":
            move[0]--;
            break;
        case "d":
            move[0]++;
            break;
    }
}
window.onkeyup = function(e) {
    switch(e.key) {
        case "w":
            moves[1] = 0;
            break;
        case "s":
            move[1] = 0;
            break;
        case "a":
            move[0] = 0;
            break;
        case "d":
            move[0] = 0;
            break;
    }
    if(!temp) {
        temp = true;
    }
}
