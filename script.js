/**
 * All Variables
 */

// Canvas
const { body } = document;
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

// Canvas Size
const canvasWidth = 500;
const canvasHeight = 700;

// Paddle Size
const paddleHeight = 10;
const paddleWidth = 50;

// Paddle position
let paddleBottomX = 225;
let paddleTopX = 225;


/**
 * Render Everything on Canvas 
 */
function renderCanvas() {
  // Canvas Background
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvasWidth, canvasHeight); // fillRect(x, y, width, height)

  // Paddle Color
  context.fillStyle = 'white';

  // Paddle Top (Computer)
  context.fillRect(paddleTopX, 10, paddleWidth, paddleHeight);

  // Paddle Bottom (Player)
  context.fillRect(paddleBottomX, canvasHeight - 20, paddleWidth, paddleHeight);
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