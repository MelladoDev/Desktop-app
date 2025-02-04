let img = new Image();
img.src = 'src/frog_spritesheet.png';
img.onload = function() {
    window.requestAnimationFrame(gameLoop);
  };

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

const scale = 1;
const width = 64;
const height = 32;
const scaledWidth = scale * width;
const scaledHeight = scale * height;

function drawFrame(frameX, frameY, canvasX, canvasY) {
  ctx.drawImage(img,
                frameX * width, frameY * height, width, height,
                canvasX, canvasY, scaledWidth, scaledHeight);
}

const CYCLE_LOOP = [0, 1, 2, 3];
let currentLoopIndex = 0;
let frameCount = 0;
const FRAME_LIMIT = 12;

const FACING_DOWN = 0;
const FACING_UP = 0;
const FACING_LEFT = 0;
const FACING_RIGHT = 3;
let currentDirection = FACING_DOWN;


let keyPresses = {};

window.addEventListener('keydown', keyDownListener);
function keyDownListener(event) {
    keyPresses[event.key] = true;
}

window.addEventListener('keyup', keyUpListener);
function keyUpListener(event) {
    keyPresses[event.key] = false;
}

const MOVEMENT_SPEED = 1;
let positionX = 0;
let positionY = 0;

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let hasMoved = false;
    
    if (keyPresses.w) {
        positionY -= MOVEMENT_SPEED;
        currentDirection = FACING_UP;
        hasMoved = true;
      } else if (keyPresses.s) {
        positionY += MOVEMENT_SPEED;
        currentDirection = FACING_DOWN;
        hasMoved = true;
      }
    
      if (keyPresses.a) {
        positionX -= MOVEMENT_SPEED;
        currentDirection = FACING_LEFT;
        hasMoved = true;
      } else if (keyPresses[" "]) {
        positionX += MOVEMENT_SPEED;
        currentDirection = FACING_RIGHT;
        hasMoved = true;
      }
    if (hasMoved) {
        frameCount++;
        if (frameCount >= FRAME_LIMIT) {
          frameCount = 0;
          currentLoopIndex++;
          if (currentLoopIndex >= CYCLE_LOOP.length) {
            currentLoopIndex = 0;
          }
        }
      }
 

      drawFrame(CYCLE_LOOP[currentLoopIndex], currentDirection, positionX, positionY);
      window.requestAnimationFrame(gameLoop);
    }