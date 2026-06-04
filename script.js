const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
    x:100,
    y:100,
    size:15,
    speed:4
};

const enemy = {
    x:600,
    y:250,
    size:15
};

const keys = {};

document.addEventListener("keydown",e=>{
    keys[e.key]=true;
});

document.addEventListener("keyup",e=>{
    keys[e.key]=false;
});

function update(){

    if(keys["ArrowUp"]) player.y-=player.speed;
    if(keys["ArrowDown"]) player.y+=player.speed;
    if(keys["ArrowLeft"]) player.x-=player.speed;
    if(keys["ArrowRight"]) player.x+=player.speed;

    let dx = player.x - enemy.x;
    let dy = player.y - enemy.y;

    let distance = Math.sqrt(dx*dx + dy*dy);

    if(distance < 150){
        enemy.x += dx/distance;
        enemy.y += dy/distance;
    }

    if(distance < player.size + enemy.size){
        alert("Enemy Caught You!");
        location.reload();
    }
}

function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="lime";
    ctx.beginPath();
    ctx.arc(player.x,player.y,player.size,0,Math.PI*2);
    ctx.fill();

    ctx.fillStyle="red";
    ctx.beginPath();
    ctx.arc(enemy.x,enemy.y,enemy.size,0,Math.PI*2);
    ctx.fill();
}

function gameLoop(){
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
