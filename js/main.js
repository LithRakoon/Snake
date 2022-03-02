let epic = document.querySelector('body');
let scoreboard = document.querySelector('#scoreboard');
let points = 0;
let snakeHead = document.querySelector('#little-box');
let playField = document.querySelector('#playfield');
let redSnake = document.querySelector('#red')


function moveDown(snakeHead) {
    let tutorialShit = window.getComputedStyle(snakeHead);
    let topValue = tutorialShit.getPropertyValue("top").replace("px", "");
    snakeHead.style.top = (Number(topValue) + 20) + "px";
}

epic.addEventListener('keydown', (event) => {
    if (event.key === "w") {
        move(snakeHead, "top")
    } if (event.key === "a") {
    
    } if (event.key === "s") {
        
    } if (event.key === "d") {
       
    }
});


function thiswillchange () {
        points += 1
        //console.log(points)
        scoreboard.innerHTML = `Score: ${points}`;
}

function move(snakeHead, direction, distance=20) {
    var topOrLeft = (direction=="left" || direction=="right") ? "left" : "top";
    var frameDistance = 1;
    if (direction=="up" || direction=="left"){
       distance *= -1;
       frameDistance = -1;
    }
    var elStyle = window.getComputedStyle(snakeHead);
    var value = elStyle.getPropertyValue(topOrLeft).replace("px", "");
    var destination = (Number(value) + distance) + "px";
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
    var movingFrames = setInterval(moveAFrame, 10);
 }

redSnake.addEventListener('click', (event) => {
    snakeHead.style.backgroundColor = 'red';
});
