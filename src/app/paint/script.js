// DOM
const canvas = document.querySelector('#canvas');
const canvasContainer = document.querySelector('.canvas-container');
const brushSizeInput = document.querySelector('#brushSize');
const mainColorPicker = document.querySelector('#mainColorPicker');
const secondColorPicker = document.querySelector('#secondColorPicker');
const clearBtn = document.querySelector('#clearCanvas');
const canvasWidthInput = document.querySelector('#canvasWidth');
const canvasHeightInput = document.querySelector('#canvasHeight');

// setting
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let mainColor = '#f00000';
let secondColor = '#000000';
let brushSize = 3;

// flag
let currentMode = 'draw';
let isMouseDown = false;

document.addEventListener('DOMContentLoaded', () => {
  fillArea('canvas');
  handleDraw();
  mainColorPicker.value = mainColor;
  secondColorPicker.value = secondColor;
  canvasWidthInput.value = canvas.width;
  canvasHeightInput.value = canvas.height;
  brushSizeInput.value = ctx.lineWidth = brushSize;
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
    console.log(canvas.offsetTop);
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
    ctx.strokeStyle = mainColor;
    ctx.stroke();
  });

  canvas.addEventListener('mouseup', (e) => {
    isMouseDown = false;
    ctx.closePath();
  });
}

brushSizeInput.addEventListener('input', handleBrushSize);

function changeMode(mode) {
  return currentMode = mode;
}

function handleBrushSize(e) {
  brushSize = ctx.lineWidth = e.target.value;
}

mainColorPicker.addEventListener('input', handleMainColor);

function handleMainColor(e) {
  mainColor = ctx.strokeStyle = e.target.value;
}

secondColorPicker.addEventListener('input', handleSecondColor);
function handleSecondColor(e) {
  secondColor = e.target.value;
}

clearBtn.addEventListener('click', (e) => {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  fillArea('canvas');
})
canvasWidthInput.addEventListener('input', (e) => {
  canvasWidth = canvas.width = e.target.value;
})
canvasHeightInput.addEventListener('input', (e) => {
  canvasHeight = canvas.height = e.target.value;
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
    console.log('g');
    changeMode('fill');
  }
})

function switchColor(e) {
  [ mainColor, secondColor ] = [ secondColor, mainColor];
  mainColorPicker.value = mainColor;
  secondColorPicker.value = secondColor;
}

const addLayerBtn = document.querySelector('#addLayerBtn');
const layerWrapper = document.querySelector('#layerWrapper');

const layers = new Proxy([], {
  get: (target, index) => {
    return target[index];
  },
  set: (target, index, value) => {
    const li = document.createElement('li');
    target[index] = value;
    li.textContent = value.order;
    layerWrapper.appendChild(li);
    return true;
  }
})

// function updateLayer() {
//   layersProxy.splice(0, layersProxy.length);
//   for (const li of layerContainer.children) {
//     layersProxy.push(li.textContent);
//   }
// }

// addLayerBtn.addEventListener('click', createNewLayer);
// function createNewLayer() {
//   const layer = {
//     order: 1,
//   };
//   layersProxy.push(layer);
// }

function render(element, data) {
  if (typeof value === 'string') {
    element.innerHTML = value;
  };
  if (typeof value === 'number') {
    element.innerHTML = value.toString();
  }
  if (Array.isArray(value)) {
    element.innerHTML = '';
    value.forEach( data => {
      const itemElement = document.createElement('li');
    })
  }
}

addLayerBtn.addEventListener('click', createNewLayer);
function createNewLayer() {
  const layer = {
    order: 1,
  };
  const list = document.createElement('li');
  const delBtn = document.createElement('button');
  const cleanBtn = document.createElement('button');
  delBtn.innerText = 'delete layer';
  delBtn.id = 'delLayer'
  cleanBtn.innerText = 'clean layer';
  list.innerHTML = layer.order;
  list.appendChild(delBtn);
  list.appendChild(cleanBtn);
  layerWrapper.appendChild(list);
  layers.push(layer);

  const delBtnArray = document.querySelectorAll('#delLayer');
  delBtnArray.forEach( btn => {
    btn.addEventListener('click', e => {
      console.log(e.target);
      layerContainer.forEach(layer => {

      })
    }) 
  })
}

