
document.addEventListener('DOMContentLoaded', () => {
  handleDraw();
})

const canvas = document.querySelector('#canvas');
let isMouseDown = false;

canvas.width = 800;
let brush = 1;
let brushColor = null;

const ctx = canvas.getContext('2d');
const brushSize = document.querySelector('#brushSize');
const colorPicker = document.querySelector('#colorPicker');
const bgColorPicker = document.querySelector('#bgColorPicker');
const clearBtn = document.querySelector('#clearCanvas');
let canvasX;
let canvasY;

function handleDraw() {
  if(!canvas) {
    throw new Error('Canvas not supported!');
  }
  canvas.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    ctx.beginPath();
    canvasX = e.clientX - canvas.offsetLeft;
    canvasY = e.clientY - canvas.offsetTop;
    ctx.moveTo(canvasX, canvasY);
  });

  canvas.addEventListener('mousemove', (e) => {
    if (!isMouseDown) {
      e.preventDefault();
      return;
    }
    canvasX = e.clientX - canvas.offsetLeft;
    canvasY = e.clientY - canvas.offsetTop;
    ctx.lineTo(canvasX, canvasY);
    ctx.strokeStyle = brushColor;
    ctx.stroke();
  });

  canvas.addEventListener('mouseup', (e) => {
    isMouseDown = false;
    ctx.closePath();
  });
}

brushSize.addEventListener('input', handleBrushSize);

function handleBrushSize(event) {
  brush = event.target.value;
  ctx.lineWidth = brush;
}

colorPicker.addEventListener('input', handleColor);

function handleColor(event) {
  brushColor = event.target.value;
  ctx.strokeStyle = brushColor;
}

bgColorPicker.addEventListener('input', handleBgColor);

function handleBgColor(event) {
  ctx.fillStyle = event.target.value;
}

clearBtn.addEventListener('click', (e) => {
  canvasX = e.clientX - canvas.offsetLeft;
  canvasY = e.clientY - canvas.offsetTop;
  ctx.clearRect(0, 0, canvasX, canvasY);
})
