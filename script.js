/**
 * All Variables
 */

// Canvas
const { body } = document;
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Canvas Size
const canvasWidth = 500;
const canvasHeight = 700;
const screenWidth = window.screen.width;
const canvasPosition = screenWidth / 2 - canvasWidth / 2;

// Paddle Size
const paddleHeight = 10;
const paddleWidth = 50;
const paddleDiff = 25;

// Paddle position 
let paddleComputerX = 225; 
let paddlePlayerX = 225;  

// Player Controls
let playerMoved = false;
let paddleContact = false;

// Ball
let ballX = 250;
let ballY = 350;
const ballRadius = 5;

// Speed
let speedY;
let speedX;
let trajectoryX;
let computerSpeed;

// Score
let computerScore = 0;
let playerScore = 0;


// Set init speed
speedY = -1;
speedX = speedY;
computerSpeed = 3;


/**
 * Render Everything on Canvas 
 */
function renderCanvas() {
  // Canvas Background
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight); // fillRect(x, y, width, height)

  // Paddles
  ctx.fillStyle = 'white';
  ctx.fillRect(paddleComputerX, 10, paddleWidth, paddleHeight);               // Paddle Top (Computer)
  ctx.fillRect(paddlePlayerX, canvasHeight - 20, paddleWidth, paddleHeight);  // Paddle Bottom (Player)

  // Dashed Center Line
  ctx.beginPath();
  ctx.strokeStyle = 'grey';
  ctx.moveTo(0, 350);
  ctx.lineTo(500, 350);
  ctx.setLineDash([4]);
  ctx.stroke();

  // Ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 2 * Math.PI, false);
  ctx.fillStyle = 'white';
  ctx.fill();

  // Score
  ctx.font = '32px Courier New';
  ctx.fillText(computerScore, 20, canvas.height / 2 - 30);  // Score Top (Computer)
  ctx.fillText(playerScore, 20, canvas.height / 2 + 50);    // Score Bottom (Player)

}


/**
 * Create Canvas Elements
 */
function createCanvas() {
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  body.appendChild(canvas);
  renderCanvas();
}



// /**
//  *  Reset Ball to Center
//  */
function ballReset() {
  ballX = canvasWidth / 2;
  ballY = canvasHeight / 2;
  speedY = -3;
  paddleContact = false;
}

/**
 * Adjust Ball Movement
 */
function ballMove() {
  // Vertical Speed
  ballY += -speedY;
  // // Horizontal Speed
  if (playerMoved && paddleContact) {
    ballX += speedX;
  }

  
}


/**
 * Determine What Ball Bounces Off, Score Points, Reset Ball
 */
function ballBoundaries() {
  
  // Bounce off player paddle (bottom)
  if (ballY > canvasHeight - paddleDiff) {
    if (ballX > paddlePlayerX && ballX < paddlePlayerX + paddleWidth) {
      paddleContact = true;
      // Add Speed on Hit
      if (playerMoved) {
        speedY -= 1;
        // Max Speed
        if (speedY < -5) {
          speedY = -5;
          computerSpeed = 6;
        }
      }
      speedY = -speedY;
      trajectoryX = ballX - (paddlePlayerX + paddleDiff);
      speedX = trajectoryX * 0.3;
    } else if (ballY > canvasHeight) {
      // Reset Ball, add to Computer Score
      ballReset();
      computerScore++;
    }
  }

  // Bounce off computer paddle (top)
  if (ballY < paddleDiff) {
    if (ballX > paddleComputerX && ballX < paddleComputerX + paddleWidth) {
      // Add Speed on Hit
      if (playerMoved) {
        speedY += 1;
        // Max Speed
        if (speedY > 5) {
          speedY = 5;
        }
      }
      speedY = -speedY;
    } else if (ballY < 0) {
      // Reset Ball, add to Player Score
      ballReset();
      playerScore++;
    }
  }

  // Bounce off Left Wall
  if (ballX < 0 && speedX < 0) {
    speedX = -speedX;
  }

  // Bounce off Right Wall
  if (ballX > canvasWidth && speedX > 0) {
    speedX = -speedX;
  }

}


/**
 * Computer Movement
 */
function computerAI() {
  if (playerMoved) {
    if (paddleComputerX + paddleDiff < ballX) {
      paddleComputerX += computerSpeed;
    } else {
      paddleComputerX -= computerSpeed;
    }
  }
}


/**
 * Called Every Frame
 */
function animate() {
  renderCanvas();
  ballMove();
  ballBoundaries();
  computerAI();
  window.requestAnimationFrame(animate);

  console.log(paddleComputerX)

}


/**
 * Start Game, Reset Everything
 */
function startGame() {
  computerScore = 0;
  playerScore = 0;

  ballReset();
  createCanvas();
  animate();

  canvas.addEventListener('mousemove', (e) => {
    playerMoved = true;
     // Compensate for canvas being centered
    paddlePlayerX = e.clientX - canvasPosition - paddleDiff;

    if (paddlePlayerX < paddleDiff) {
      paddlePlayerX = 0;
    }
    if (paddlePlayerX > canvasWidth - paddleWidth) {
      paddlePlayerX = canvasWidth - paddleWidth;
    }

  })

}

// On Load
startGame();