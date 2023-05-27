
import layer from './layer.js';

// DOM Elements
const canvas = document.querySelector('#canvas');
const canvasContainer = document.querySelector('.canvas-container');
const brushSizeInput = document.querySelector('#brushSize');
const mainColorPicker = document.querySelector('#mainColorPicker');
const secondColorPicker = document.querySelector('#secondColorPicker');
const clearBtn = document.querySelector('#clearCanvas');
const canvasWidthInput = document.querySelector('#canvasWidth');
const canvasHeightInput = document.querySelector('#canvasHeight');

// Tool Settings
let Canvas_Width = canvas.width;
let Canvas_Height = canvas.height;
let Main_Color = '#ff0000';
let Second_Color = '#00ffff';
let Brush_Size = 3;

// flag
let currentMode = 'draw';
let isMouseDown = false;

// init
document.addEventListener('DOMContentLoaded', () => {
  fillArea('canvas');
  handleDraw();
  mainColorPicker.value = Main_Color;
  secondColorPicker.value = Second_Color;
  canvasWidthInput.value = canvas.width;
  canvasHeightInput.value = canvas.height;
  brushSizeInput.value = ctx.lineWidth = Brush_Size;
})

document.addEventListener('mouseover', e => {
  if (e.target.id === 'canvas') {
    document.body.style.cursor = 'crosshair';
  } else {
    document.body.style.cursor = 'arrow';
  }
})

let canvasX;
let canvasY;
let canvasTop = canvasContainer.offsetTop;
let canvasLeft = canvasContainer.offsetLeft;

const ctx = canvas.getContext('2d');

function handleDraw() {
  if (!canvas) {
    throw new Error('Canvas not supported!');
  }
  canvas.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    ctx.beginPath();
    canvasX = e.clientX - canvasLeft;
    canvasY = e.clientY - canvasTop;
    ctx.moveTo(canvasX, canvasY);
  });

  canvas.addEventListener('mousemove', (e) => {
    if (!isMouseDown) {
      e.preventDefault();
      return;
    }
    canvasX = e.clientX - canvasLeft;
    canvasY = e.clientY - canvasTop;
    ctx.lineTo(canvasX, canvasY);
    ctx.strokeStyle = Main_Color;
    ctx.stroke();
  });

  canvas.addEventListener('mouseup', (e) => {
    isMouseDown = false;
    ctx.closePath();
  });
}

// brushSizeInput.addEventListener('input', handleBrushSize);
brushSizeInput.addEventListener('input', handleBrushSize);

function changeMode(mode) {
  return currentMode = mode;
}

function handleBrushSize(e) {
  let val = e.target.value
  changeBrushSize(val);
}

mainColorPicker.addEventListener('input', handleMainColor);

function handleMainColor(e) {
  Main_Color = ctx.strokeStyle = e.target.value;
}

secondColorPicker.addEventListener('input', handleSecondColor);
function handleSecondColor(e) {
  Second_Color = e.target.value;
}

clearBtn.addEventListener('click', (e) => {
  ctx.clearRect(0, 0, Canvas_Width, Canvas_Height);
  fillArea('canvas');
})
canvasWidthInput.addEventListener('input', (e) => {
  Canvas_Width = canvas.width = e.target.value;
})
canvasHeightInput.addEventListener('input', (e) => {
  Canvas_Height = canvas.height = e.target.value;
})

function fillArea(element) {
  if (element === 'canvas') {
    ctx.fillStyle = "#f2f2f2";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    return;
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'x') {
    switchColor();
  }
  if (e.key === 'g') {
    changeMode('fill');
  }
  if (e.key === 'a') {
    Brush_Size --;
    changeBrushSize(Brush_Size);
  }
  if (e.key === 's') {
    Brush_Size ++;
    changeBrushSize(Brush_Size);
  }
})

function switchColor(e) {
  [ Main_Color, Second_Color ] = [ Second_Color, Main_Color];
  mainColorPicker.value = Main_Color;
  secondColorPicker.value = Second_Color;
}

function changeBrushSize(val) {
  Brush_Size = ctx.lineWidth = val;
  brushSizeInput.value = Brush_Size;
}

// Layer
const layerContainer = [];
const newLayer = new layer('');
layerContainer.push(newLayer);


const addLayerBtn = document.querySelector('#addLayerBtn');
const layerWrapper = document.querySelector('#layerWrapper');

layerWrapper.innerHTML = ''

addLayerBtn.addEventListener('click', e => {
  const test = ctx.getImageData(10, 10, Canvas_Width, Canvas_Height);
  console.log(test);
  let imageData = new ImageData(200, 100, { colorSpace: "display-p3" })
  const newLayer = new layer(imageData);
  console.log(newLayer.image_data);
  layerContainer.push(newLayer);
})