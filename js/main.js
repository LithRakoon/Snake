let epic = document.querySelector('body');
let scoreboard = document.querySelector('#scoreboard');
let points = 0;
let snakeHead = document.querySelector('#little-box');
let playField = document.querySelector('#playfield');
let redSnake = document.querySelector('#snakered');
let greenSnake = document.querySelector('#snakegreen');
let purpleSnake = document.querySelector('#snakepurple');
let blueSnake = document.querySelector('#snakeblue');
let timeout;
let startgame = "stop";
let playfield_rect = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
};
let snakehead_rect = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
};
let gameover = false;
let directinal = "";
let snakeFood = document.createElement("div")

window.onload = function() {
    getPlayfieldCoords();
};

function getPlayfieldCoords()
{
    let rect = playField.getBoundingClientRect();
    playfield_rect.x1 = rect.x;
    playfield_rect.y1 = rect.y;
    playfield_rect.x2 = rect.right;
    playfield_rect.y2 = rect.bottom;
}

function checkBounds()
{
    let rect = snakeHead.getBoundingClientRect();
    console.log(rect);
    snakehead_rect.x1 = rect.x;
    snakehead_rect.y1 = rect.y;
    snakehead_rect.x2 = rect.right;
    snakehead_rect.y2 = rect.bottom;

    if(snakehead_rect.x1 >= playfield_rect.x1 + 5 && 
        snakehead_rect.x2 <= playfield_rect.x2 - 7 &&
        snakehead_rect.y1 >= playfield_rect.y1 + 5 &&
        snakehead_rect.y2 <= playfield_rect.y2 - 7) {
            return true;
    }

    gameOverScreen();
    return false ; 
}

let interValID = setInterval( () => {
    if (startgame === "start") {
        move(snakeHead, directinal)
        
    }

}, 100)

epic.addEventListener('keydown', (event) => {
    if (event.key === "w") {
        startgame = "start"
        gameover = false
        directinal = "up"
    } if (event.key === "a") {
        startgame = "start"
        gameover = false
        directinal = "left"
    } if (event.key === "s") {
        startgame = "start"
        gameover = false
        directinal = "top"
    } if (event.key === "d") {
        startgame = "start"
        gameover = false
        directinal = "right"
    }
});

function thiswillchange () {
        points += 1
        //console.log(points)
        scoreboard.innerHTML = `Score: ${points}`;
}

function move(snakeHead, direction, distance=5) {
    if(!checkBounds())
        return;

    let topOrLeft = (direction=="left" || direction=="right") ? "left" : "top";
    let frameDistance = 1;
    if (direction=="up" || direction=="left"){
       distance *= -1;
       frameDistance = -1;
    }
    let elStyle = window.getComputedStyle(snakeHead);
    let value = elStyle.getPropertyValue(topOrLeft).replace("px", "");
    let destination = (Number(value) + distance) + "px";
    function moveAFrame() {
       if (elStyle.getPropertyValue(topOrLeft)==destination) {
         clearInterval(movingFrames);
       }
       else {
          elStyle = window.getComputedStyle(snakeHead);
          value = elStyle.getPropertyValue(topOrLeft).replace("px", "");
         snakeHead.style[topOrLeft] = (Number(value) + frameDistance) + "px";
       }
    }
    let movingFrames = setInterval(moveAFrame, 10);
 }

function gameOverScreen () {
    if (gameover == false){
        gameover = true;
        directinal = "";
        startgame = "stop"
        snakeHead.style.top = "0px";
        snakeHead.style.left = "0px";
        alert('Game Over!');
    }
}

redSnake.addEventListener('click', (event) => {
    snakeHead.style.backgroundColor = 'red';
});

greenSnake.addEventListener('click', (event) => {
    snakeHead.style.backgroundColor = 'green';
});

purpleSnake.addEventListener('click', (event) => {
    snakeHead.style.backgroundColor = 'purple';
});

blueSnake.addEventListener('click', (event) => {
    snakeHead.style.backgroundColor = 'blue';
});

function randomTen(min, max) {
    return Math.round((Math.random() * (max-min) /10 ) * 10);
    function creatFood() {
        foodX = randomTen(0, playField.width -10);
        foodY = randomTen(0, playField.height - 10); snakeHead.forEach(function isFoodOnSnake(part) {
            const foodIsOnSnake = part.x == foodX && part.y == foodY
            if (foodIsOnSnake)
            creatFood();
        })
    }

}

function drawFood() {
    snakeFood.id = 'snek';
    snakeFood.className = 'snekcless'
    // document.body.appendChild
    playField.appendChild(snakeFood);
} 