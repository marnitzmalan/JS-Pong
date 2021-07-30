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
let paddleBottomX = 225;
let paddleTopX = 225;

// Ball
let ballX = 250;
let ballY = 350;
const ballRadius = 5;


/**
 * Render Everything on Canvas 
 */
function renderCanvas() {
  // Canvas Background
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight); // fillRect(x, y, width, height)

  // Paddle Color
  ctx.fillStyle = 'white';

  // Paddle Top (Computer)
  ctx.fillRect(paddleTopX, 10, paddleWidth, paddleHeight);

  // Paddle Bottom (Player)
  ctx.fillRect(paddleBottomX, canvasHeight - 20, paddleWidth, paddleHeight);

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

// TODO: remove this
createCanvas();