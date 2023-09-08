var pos = 0;
let pageWidth = window.innerWidth;
const pacArray = [
  ["./PacMan1.png", "./PacMan2.png"],
  ["./PacMan3.png", "./PacMan4.png"],
];
var direction = 0;
var focus = 0;

function Run() {
  createBalls();
  eatBalls();
  let img = document.getElementById("PacMan");
  let imgWidth = img.width;
  focus = (focus + 1) % 2;
  direction = checkPageBounds(direction, imgWidth, pos, pageWidth);
  img.src = pacArray[direction][focus];
    if (direction) {
        pos -= 20;
        img.style.left = pos + "px";
  } else {
    pos += 20;
    img.style.left = pos + "px";
    }
}
setInterval(Run, 300);

function checkPageBounds(direction, imgWidth, pos, pageWidth) {
  if (direction == 0 && pos + imgWidth > pageWidth) direction = 1;
  if (direction == 1 && pos < 0) direction = 0;

  return direction;
} //code above was from Mitx Pro for class. John Williams is the author. Please look in license in files for full copyright details. 

var x = [];
var y = []; // for ball position
var numBalls = 10;
function createBalls() { 
    for(let i = 0; i < numBalls; i++) {
        let ball = document.createElement('div');
            ball.className = 'ball';
            ball.style.left = (i * 120 + 375) + 'px';
            ball.style.top = '90px';
            document.body.appendChild(ball);
    }
   
} // for creating the balls

function eatBalls() {
    var balls = document.querySelectorAll('.ball') //https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
    var pacman = document.getElementById('PacMan');
    var pacmanPos = pacman.getBoundingClientRect();
            
    balls.forEach(function(ball) { 
        var ballPos = ball.getBoundingClientRect();// still trying to figure why this did not work outside of this function??

        if( pacmanPos.left < ballPos.right &&
            pacmanPos.right > ballPos.left &&
            pacmanPos.top < ballPos.bottom &&
            pacmanPos.bottom > ballPos.top) {
                ball.parentNode.removeChild(ball);
        }         
    });
}// for making the balls disappear after pacman 'eats' them.  
//Got the idea for how to track the balls and pacman from: https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element  Author was Andy E. 
//Took me a good bit to find the parentNode.removeChild on mdn. Saving this here for the future https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode