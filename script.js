var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

var ballX = canvas.width/2;
var ballY = canvas.height-30;
var dx = 0;
var dy = -2;
var ballradius = 8;

var speedCap = 4;
var hSpeed = 0.2;

var slimeHeight = 10;
var slimeWidth = 75;
var slime1X = 0
var slime1Y = canvas.height
var slime1dy = 0;
var slime1dx = 0;
var slime1leftPressed = false;
var slime1rightPressed = false;
var slime1upPressed = false;

var airDrag = -0.25
var friction = 0.9


function collisonDectection(){
    if(ballX+dx > canvas.width-ballradius || ballX+dx < ballradius){
        dx = -dx
    }
}

function matchSign(num1,num2){
    if(num1 < 0){
        return -num2
    }
    else{
        return num2
    }
}

// function drawScore(){
//     ctx.font = "16px Arial";
//     ctx.fillStyle = "#0095DD";
//     ctx.fillText(score,8,20)
// }

// function drawBricks(){
//     for(var c = 0; c< brickColumnCount; c++){
//         for(var r=0; r<brickRowCount; r++){
//             if(bricks[c][r].status == 1){
//                 bricks[c][r].x = (c*(brickWidth+brickPadding))+brickOffsetLeft;
//                 bricks[c][r].y = (r*(brickHeight+brickPadding))+brickOffsetTop;
//                 ctx.beginPath();
//                 ctx.rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
//                 ctx.fillStyle = "#0095DD";
//                 ctx.fill();
//                 ctx.closePath();
//             }
//         }
//     }
// }

function drawSlime(){
    if(slime1rightPressed){
        if(slime1dx < 0){
            slime1dx = 0;
        }
        slime1dx += hSpeed;
    }
    if(slime1leftPressed){
        if(slime1dx > 0){
            slime1dx = 0;
        }
        slime1dx -= hSpeed;
    }
    if(slime1upPressed){
        if(slime1Y == canvas.height){
            slime1dy -= 7;
        }
    }
    if(slime1Y == canvas.height && slime1dx != 0 && !slime1rightPressed && !slime1leftPressed){
        slime1dx -= slime1dx * (1-friction)
    }
    if(slime1Y != canvas.height){
        slime1dy -= airDrag;
    }

    if(Math.abs(slime1dx) >= speedCap){
        slime1dx = matchSign(slime1dx,speedCap)
    }

    slime1X += slime1dx
    slime1Y += slime1dy

    if(slime1X + slimeWidth > canvas.width){
        slime1X = canvas.width - slimeWidth;
        slime1dx = 0;
    }
    if(slime1X< 0){
        slime1X = 0;
    }
    if(slime1Y >= canvas.height){
        slime1dy = 0;
        slime1Y = canvas.height;
    }

    ctx.beginPath();
    ctx.rect(slime1X, slime1Y - slimeHeight, slimeWidth, slimeHeight)
    ctx.fillStyle = "#0095DD"
    ctx.fill();
    ctx.closePath();
}

function drawBall(){
    if(ballX+dx > canvas.width-ballradius || ballX+dx < ballradius){
        dx = -dx
    }
    if(ballY+dy < ballradius || ballY+dy >= canvas.height-ballradius){
        dy = -dy;
    }
    ctx.beginPath();
    ctx.arc(ballX,ballY,ballradius, 0, Math.PI*2)
    ctx.fillStyle="#0095DD";
    ctx.fill();
    ctx.closePath();
}
function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height)
   
    drawBall();
    drawSlime();
    collisonDectection();
    // else if(ballY+dy > canvas.height - ballradius){
    //     alert("Game Over");
    //     document.location.reload();
    //     clearInterval(interval);
    // }
    if(ballY == 0 && dx != 0){
        dx -= matchSign(dx,friction)
    }
    ballX += dx;

    if(dy != 0){
        dy += airDrag
    }
    ballY += dy;
}

var interval = setInterval(draw,10)
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        slime1rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft"){
        slime1leftPressed = true;
    }
    else if(e.key == "Up" || e.key == "ArrowUp"){
        slime1upPressed = true;
    }
}

function keyUpHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        slime1rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft"){
        slime1leftPressed = false;
    }
    else if(e.key == "Up" || e.key == "ArrowUp"){
        slime1upPressed = false;
    }

}