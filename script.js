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

// Paddle Size
const paddleHeight = 10;
const paddleWidth = 50;

// Paddle position 
let paddleComputerX = 225; 
let paddlePlayerX = 225;  

// Player
let playerMoved = false;

// Ball
let ballX = 250;
let ballY = 350;
const ballRadius = 5;

// Speed
let speedY = -3;
let speedX;

// Score
let computerScore = 0;
let playerScore = 0;



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
// function ballReset() {
//   ballX = width / 2;
//   ballY = height / 2;
//   speedY = -3;
//   paddleContact = false;
// }

/**
 * Adjust Ball Movement
 */
function ballMove() {
  // Vertical Speed
  ballY += -speedY;
  // // Horizontal Speed
  // if (playerMoved && paddleContact) {
  //   ballX += speedX;
  // }
}


/**
 * Called Every Frame
 */
function animate() {
  renderCanvas();
  ballMove();
  // ballBoundaries();
  // computerAI();
}


/**
 * Start Game, Reset Everything
 */
function startGame() {

  computerScore = 0;
  playerScore = 0;

  // ballReset();
  createCanvas();
  // animate();

  // animate at 60 fps
  setInterval(animate, 1000/60); 

  canvas.addEventListener('mousemove', (e) => {
    playerMoved = true;


  })

}

// On Load
startGame();