const cnv = document.getElementById("canvas");
const ctx = cnv.getContext("2d");
let pos = []
const sprites = [];
let bldAmt = 0;
let loaded = 0;

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
    ctx.strokeText("You can move with W, A, S, and D", 300, 350, 400);
    window.requestAnimationFrame(intro);
}

function draw() {
    ctx.beginPath();
    ctx.rect(0, 0, 1000, 600);
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.stroke();
    ctx.drawImage(sprites[bldAmt]);
    window.requestAnimationFrame(draw);
}
