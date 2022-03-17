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
let snakeFood_rect = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
}

let gameover = false;
let directinal = "";
var div = document.createElement("div");
let teest = document.querySelector("#teest");
let snakeFood = document.querySelector('#snakefood')





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
    console.log(snakeFood_rect.x1)
}

function checkFood()
{
    getBounds(snakeFood_rect, snakeFood);
    let mrect = {
        x: 0,
        y: 0
    };
    mrect.x = snakeFood_rect.x1 + ((snakeFood_rect.x2 - snakeFood_rect.x1)/2);
    mrect.y = snakeFood_rect.y1 + ((snakeFood_rect.y2 - snakeFood_rect.y1)/2);
    
    console.log('MRECT: ', mrect);




    // let rect = div.getBoundingClientRect();
    // snakeFood_rect.x1 = rect.x;
    // snakeFood_rect.y1 = rect.y;
    // snakeFood_rect.x2 = rect.right;
    // snakeFood_rect.y2 = rect.bottom;
    // if(snakeFood_rect.x1 == snakehead_rect.x1 + 10 && 
    //     snakeFood_rect.x2 == snakehead_rect.x2 -10 &&
    //     snakeFood_rect.y1 == snakehead_rect.y1 + 10 &&
    //     snakeFood_rect.y2 == snakehead_rect.y2 - 10) {
        //         return true;
        // }

            // ((snakehead_rect.x2 <= snakeFood_rect.x2 && snakehead_rect.x2 >= snakeFood_rect.x1 && 
            //  snakehead_rect.y2 <= snakeFood_rect.y2 && snakehead_rect.y2 >= snakeFood_rect.y1) ||
            // (snakehead_rect.x2 <= snakeFood_rect.x2 && snakehead_rect.x2 >= snakeFood_rect.x1 && 
            //  snakehead_rect.y1 <= snakeFood_rect.y2 && snakehead_rect.y1 >= snakeFood_rect.y1) ||
            // (snakehead_rect.x1 <= snakeFood_rect.x2 && snakehead_rect.x1 >= snakeFood_rect.x1 && 
            //  snakehead_rect.y1 <= snakeFood_rect.y2 && snakehead_rect.y1 >= snakeFood_rect.y1) ||
            // (snakehead_rect.x1 <= snakeFood_rect.x2 && snakehead_rect.x1 >= snakeFood_rect.x1 && 
            //  snakehead_rect.y2 <= snakeFood_rect.y2 && snakehead_rect.y2 >= snakeFood_rect.y1)) ||
            
            // (snakeFood_rect.x2 == snakehead_rect.x2 || snakeFood_rect.y1 == snakehead_rect.y2 ||
            //  snakeFood_rect.x2 == snakehead_rect.x1 || snakeFood_rect.y2 == snakehead_rect.y1)
            
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

function drawFood() {
    div.style.position = "absolute"
    div.style.width = "30px";
    div.style.height = "30px";
    div.style.background = "red";
    div.style.top = (95*Math.random()) + "%";
    div.style.left = (95*Math.random()) + "%";
    document.getElementById("snakefood").appendChild(div);
}


