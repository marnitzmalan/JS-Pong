// Canvas
const { body } = document;
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

const width = 500;
const height = 700;

// Render Everything on Canvas
function renderCanvas() {
  // TODO: render canvas functionality 
}

// Create Canvas Element
function createCanvas() {
  canvas.width = width;
  canvas.height = height;
  body.appendChild(canvas);
  renderCanvas();
}

// TODO: remove this
createCanvas();