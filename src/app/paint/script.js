const canvas = document.querySelector('#canvas');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let mainColor = '#f00000';
let secondColor = '#000000';
let brushSize = 3;

document.addEventListener('DOMContentLoaded', () => {
  handleDraw();
  mainColorPicker.value = mainColor;
  secondColorPicker.value = secondColor;
  canvasWidthInput.value = canvas.width;
  canvasHeightInput.value = canvas.height;
  brushSizeInput.value = ctx.lineWidth = brushSize;
})

let isMouseDown = false;

const layers = [];
const brushSizeInput = document.querySelector('#brushSize');
const mainColorPicker = document.querySelector('#mainColorPicker');
const secondColorPicker = document.querySelector('#secondColorPicker');
const clearBtn = document.querySelector('#clearCanvas');
const canvasWidthInput = document.querySelector('#canvasWidth');
const canvasHeightInput = document.querySelector('#canvasHeight');
let canvasX;
let canvasY;

const ctx = canvas.getContext('2d');

function handleDraw() {
  // return new Promise((resolve, reject) => {
  //   resolve();
    
  //   if(!canvas) {
  //     reject(new Error('Canvas not supported!'));
  //   }
  // })
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
    ctx.strokeStyle = mainColor;
    ctx.stroke();
  });

  canvas.addEventListener('mouseup', (e) => {
    isMouseDown = false;
    ctx.closePath();
  });
}

brushSizeInput.addEventListener('input', handleBrushSize);

function handleBrushSize(event) {
  brushSize = ctx.lineWidth = event.target.value;
}

mainColorPicker.addEventListener('input', handleMainColor);

function handleMainColor(event) {
  mainColor = ctx.strokeStyle = event.target.value;
}

secondColorPicker.addEventListener('input', handleSecondColor);

function handleSecondColor(event) {
  secondColor = event.target.value;
}

clearBtn.addEventListener('click', (e) => {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
})

canvasWidthInput.addEventListener('input', (e) => {
  canvasWidth = canvas.width = e.target.value;
})

canvasHeightInput.addEventListener('input', (e) => {
  canvasHeight = canvas.height = e.target.value;
})

function fillArea() {
  ctx.fillRect();
}

document.addEventListener('keydown', e => {
  if(e.key === 'x') {
    console.log('x is pressed');
    [ mainColor, secondColor ] = [ secondColor, mainColor];
    console.log(mainColor + '/' + secondColor);
  }
})

let colorProxy = new Proxy(mainColorPicker, {
  get: (value) => {
    console.log(value);
    return 'test';
  },
  set: () => {
    
  }
});

const newLayerBtn = document.querySelector('#newLayer');

newLayerBtn.addEventListener('click', e => {
  layers.push(
    {
      order: 1,
    }
  )
})

function biggest(x, y) {
  return y ? biggest(y, x%y) : x;
} 
