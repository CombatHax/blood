const cnv = document.getElementById("canvas");
const ctx = cnv.getContext("2d");
let pos = [500, 300]
const sprites = [];
let bldAmt = []; 
const bldTypes = ['A-', 'A+', 'B-', 'B+', 'AB-', 'AB+', 'O-', 'O+'];
let canRecieve = [];
let loaded = 0;
let keys = [0, 0, 0, 0];
let move = [];
let temp = false;
let temp1 = [1, 1];
let recieve = 0;
let people = [];

temp1[0] = new Image();
temp1[0].onload = imgLoad();
temp1[0].src = `assets/person.png`;
function imgLoad() {
    sprites[sprites.length] = temp1[0];
    if(!loaded) {
        sprites.length = 0;
    }
    if(loaded >= 5) {
        intro();
        for(let i = 0; i < sprites.length; i++) {
        }
        return;
    }
    temp1[0] = new Image();
    temp1[0].onload = imgLoad;
    temp1[0].src = `assets/player${loaded - 1}.png`;
    loaded++;
}
ctx.font = "42px Verdana";
ctx.fillStyle = "#0000FF";

setInterval(function() {
    if(temp) {
        return;
    }
    if(temp1[0] >= 1 || temp1[0] <= 0) {
        temp1[1] -= temp1[1] * 2;
    }
    temp1[0] += 0.1 * temp1[1];
}, 50);

function intro() {
    for(let i = 0; i < 10; i++) {
        people[i] = new Person();
    }
    recieve = Math.floor(Math.random() * 100);
        if(!recieve % 2) {
            recieve -= recieve * 2;
        }
        if(Math.abs(recieve) <= 25) {
            recieve = `A${recieve <= 0 ? '-' : '+'}`;
        }
        else if(Math.abs(recieve) <= 50) {
            recieve = `B${recieve <= 0 ? '-' : '+'}`;
        }
        else if(Math.abs(recieve) <= 75) {
            recieve = `AB${recieve <= 0 ? '-' : '+'}`;
        }
        else {
            recieve = `O${recieve <= 0 ? '-' : '+'}`;
        }
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
    ctx.fillStyle = `rgba(255, 0, 0, ${temp1[0]})`;
    ctx.fillText("Press any button to start the game", 250, 550, 500);
    if(temp) {
        draw();
        return;
    }
    window.requestAnimationFrame(intro);
}
function draw() {
    if(temp1[2]) {
        return;
    }
    for(let i = 0; i < 4; i++) {
        if(keys[i]) {
            switch(i) {
                case 0:
                    if(pos[1] >= 0) {
                        pos[1] += -5;
                    }
                    break;
                case 1:
                    if(pos[1] <= 568) {
                        pos[1] += 5;
                    }
                    break;
                case 2:
                    if(pos[0] >= 0) {
                        pos[0] += -5;
                    }
                    break;
                case 3:
                    if(pos[0] <= 968) {
                        pos[0] += 5;
                    }
                    break;
            }
        }
    }
    ctx.beginPath();
    ctx.rect(0, 0, 1000, 600);
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.stroke();
    ctx.drawImage(sprites[bldAmt.length + 1 >= 3 ? 3 : bldAmt.length + 1], pos[0], pos[1], 32, 32);
    for(let i = 0; i < people.length; i++) {
        people[i].draw();
        let persPos = people[i].persPos;
        if(Math.abs(pos[0] - persPos[0]) < 32 && Math.abs(pos[1] + 32 - persPos[1]) < 32) {
            bldAmt[bldAmt.length] = people[i].bldType; 
            console.log(bldAmt);
            people.splice(i, 1);
            people[people.length] = new Person();
        }
    }
    ctx.beginPath();
    ctx.fillStyle = '#0000FF';
    ctx.fillText(`Reciever has: ${recieve}`, 5, 50, 995);
    ctx.fillText(`You have: ${bldAmt.length > 0 ? bldAmt : "No"} donors`, 5, 100, 995);
    window.requestAnimationFrame(draw);
}
function submit() {
    let arr = []
    temp1[3] = [];
    temp1[4] = [];
    for(let i = 0; i < bldAmt.length; i++) {
        arr[arr.length] = bldTypes.indexOf(bldAmt[i]);
    }
    arr.sort(function(a, b){
        return a - b
    });
    arr = [... new Set(arr)];
    switch(recieve.slice(0, -1)) {
        case 'A':
            canRecieve = [0]
            if(recieve.slice(-1) === '+'){ 
                canRecieve.push(1, 7);
            }
            break;
        case 'B':
            canRecieve = [2]
            if(recieve.slice(-1) === '+'){ 
                canRecieve.push(3, 7)
            }
            break;
        case 'AB':
            canRecieve = [0, 2, 4]
            if(recieve.slice(-1) === '+'){ 
                canRecieve.push(1, 3, 5, 7)
            }
            break;
        case 'O':
            canRecieve = [6]
            break;
    }
    canRecieve[canRecieve.length] = 7;
    canRecieve.sort(function(a, b){
        return a - b;
    });
    canRecieve = [... new Set(canRecieve)];
    console.log(canRecieve);
}
window.onkeydown = function(e) {
    switch(e.key) {
        case "w":
            keys[0] = 1;
            break;
        case "s":
            keys[1] = 1;
            break;
        case "a":
            keys[2] = 1;
            break;
        case "d":
            keys[3] = 1;
            break;
        case "ArrowLeft":
            bldAmt.pop();
            console.log(bldAmt);
            break;
        case "ArrowDown":
            temp1[2] = true;
            submit();
            

    }
}
window.onkeyup = function(e) {
    switch(e.key) {
        case "w":
            keys[0] = 0;
            break;
        case "s":
            keys[1] = 0;
            break;
        case "a":
            keys[2] = 0;
            break;
        case "d":
            keys[3] = 0;
            break;
    }
    if(!temp) {
        temp = true;
    }
}
class Person {
    persPos = [];
    bldType = 0;
    dir = [];
    constructor() {
        this.bldType = Math.floor(Math.random() * 100);
        this.bldType = (this.bldType - 50) * 2;
        if(Math.abs(this.bldType) <= 25) {
            this.bldType = `A${this.bldType <= 0 ? '-' : '+'}`;
        }
        else if(Math.abs(this.bldType) <= 50) {
            this.bldType = `B${this.bldType <= 0 ? '-' : '+'}`;
        }
        else if(Math.abs(this.bldType) <= 75) {
            this.bldType = `AB${this.bldType <= 0 ? '-' : '+'}`;
        }
        else {
            this.bldType = `O${this.bldType <= 0 ? '-' : '+'}`;
        }
        this.changePos();
    }
    draw() {
        ctx.drawImage(sprites[0], this.persPos[0], this.persPos[1], 32, 32);
    }
    changePos() {
        let r = Math.random() * (600 - 32);
        this.persPos = [Math.floor(Math.random() * (1000 - 32)), Math.floor(r)];
    }
}
