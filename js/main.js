/*
 * Met onderstaande berekenen we de maximale afstand tussen het middelpunt van
 * de snake_head en de food wanneer snake_head op (0,0) zit en food  op (50,50)
 * Wanneer deze afstand maximaal is raakt de snake de food
 */
const _MAX_HEAD_SIZE = 50;               // Snakehead is vierkant, dit is de lengte van de zijden in pixels
const _MAX_FOOD_SIZE = 30;               // Food is vierkant, dit is de lengte van de zijden in pixels
const _MAX_DISTANCE = (_MAX_HEAD_SIZE / 2) + (_MAX_FOOD_SIZE / 2);     // Wanneer beide precies aan elkaar zitten
                                                                    // Berekenen we hier de maximale afstand 
                                                                    // tussen de middelpunten van beide
const _MAX_CENTERPOINT_DISTANCE = Math.sqrt(Math.abs(Math.pow(_MAX_DISTANCE, 2) + Math.pow(_MAX_DISTANCE, 2)));
    

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
    mx: 0,
    my: 0
};
let snakeFood_rect = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    mx: 0,
    my: 0
}


let gameover = false;
let directinal = "";
var div = document.createElement("div");
let teest = document.querySelector("#teest");
let snakeFood = document.querySelector('#snakefood div');   // Werkt niet, element food is nog niet gemaakt
let startpoints = true




window.onload = function() {
    getPlayfieldCoords();
    drawFood()
};

function getPlayfieldCoords()
{
    getBounds(playfield_rect, playField);
    // let rect = playField.getBoundingClientRect();
    // playfield_rect.x1 = rect.x;
    // playfield_rect.y1 = rect.y;
    // playfield_rect.x2 = rect.right;
    // playfield_rect.y2 = rect.bottom;
}

function getBounds(target, source)
{
    let rect = source.getBoundingClientRect();
    target.x1 = rect.x;
    target.y1 = rect.y;
    target.x2 = rect.right;
    target.y2 = rect.bottom;

}

function checkBounds()
{
    getBounds(snakehead_rect, snakeHead);
    // let rect = snakeHead.getBoundingClientRect();
    // snakehead_rect.x1 = Math.floor(rect.x);
    // snakehead_rect.y1 = Math.floor(rect.y);
    // snakehead_rect.x2 = Math.floor(rect.right);
    // snakehead_rect.y2 = rect.bottom;

    if(snakehead_rect.x1 >= playfield_rect.x1 + 5 && 
        snakehead_rect.x2 <= playfield_rect.x2 - 7 &&
        snakehead_rect.y1 >= playfield_rect.y1 + 5 &&
        snakehead_rect.y2 <= playfield_rect.y2 - 7) {
            return true;
    }

    gameOverScreen();
    return false ; 
}
function yeet() {
    getBounds(snakeFood_rect, snakeFood);
    // console.log(snakeFood_rect.x1)
}

function checkFood()
{
    let sf_distance = 0;

    // a = (snakeFood.my - snakeHead.my)^2
    // We gebruiken ABS om er voor te zorgen dat er geen negatieve getallen zijn.
    // Want soms ligt het middelpunt van de snakehead onder het middelpunt van de food
    // En als we dan food.my - head.my gaan uitrekenen komt er een negatief getal uit.
    // En negatieve afstanden bestaan niet.
    let a = Math.pow(Math.abs(snakeFood_rect.my - snakehead_rect.my), 2);
    let b = Math.pow(Math.abs(snakeFood_rect.mx - snakehead_rect.mx), 2);
    // We passen hieronder de stelling van Pietje Gras toe (Pythagoras)
    sf_distance = Math.sqrt(a + b);

    if (sf_distance <= _MAX_CENTERPOINT_DISTANCE) {
        drawFood()
        thiswillchange()
    }
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
    if(startgame == "start") {
        points += 1
        //console.log(points)
        scoreboard.innerHTML = `Score: ${points}`;
    } else {
        points = 0
        scoreboard.innerHTML = `Score: ${points}`;
    }
    
}

function move(snakeHead, direction, distance=5) {
    if(!checkBounds())
        return;
    
    if (checkFood() == true) {
        thiswillchange()
        drawFood()
    }

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
        // ******
       getBounds(snakehead_rect, snakeHead);
       getCenterPoint(snakehead_rect, 'snake');
    }

    let movingFrames = setInterval(moveAFrame, 10);
 }

function gameOverScreen () {
    if (gameover == false){
        gameover = true;
        directinal = "";
        startgame = "stop"
        thiswillchange()
        snakeHead.style.top = "0px";
        snakeHead.style.left = "0px";
        alert('Game Over!');
        points = 0
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

function drawFood() {
    div.style.position = "absolute"
    div.style.width = _MAX_FOOD_SIZE + "px";
    div.style.height = _MAX_FOOD_SIZE + "px";
    div.style.background = "red";
    div.style.top = (95*Math.random()) + "%";
    div.style.left = (95*Math.random()) + "%";
    document.getElementById("snakefood").appendChild(div);

    snakeFood = document.querySelector('#snakefood div');
    getBounds(snakeFood_rect, snakeFood);
    getCenterPoint(snakeFood_rect, 'food');
}

function getCenterPoint(el, name='')
{
    el.mx = el.x1 + ((el.x2 - el.x1) / 2);
    el.my = el.y1 + ((el.y2 - el.y1) / 2);
    // console.log(name, el);
}