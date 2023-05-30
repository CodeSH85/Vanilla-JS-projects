
import Layer from './layer.js';

// DOM Elements
// const canvas = document.querySelector('#canvas');
const canvasContainer = document.querySelector('.canvas-container');
const brushSizeInput = document.querySelector('#brushSize');
const mainColorPicker = document.querySelector('#mainColorPicker');
const secondColorPicker = document.querySelector('#secondColorPicker');
const clearBtn = document.querySelector('#clearCanvas');
const canvasWidthInput = document.querySelector('#canvasWidth');
const canvasHeightInput = document.querySelector('#canvasHeight');

// Tool Settings
let Canvas_Width = 500;
let Canvas_Height = 500;
let Main_Color = '#ff0000';
let Second_Color = '#00ffff';
let Brush_Size = 3;

// flag
let currentMode = 'draw';
let isMouseDown = false;
let currentLayer = '';

// init
document.addEventListener('DOMContentLoaded', () => {

  fillArea('canvas');
  addNewLayer();

  mainColorPicker.value = Main_Color;
  secondColorPicker.value = Second_Color;
  canvasWidthInput.value = Canvas_Width;
  canvasHeightInput.value = Canvas_Height;
  brushSizeInput.value = ctx.lineWidth = Brush_Size;
})

document.addEventListener('mouseover', e => {
  if (e.target.id === 'canvas') {
    document.body.style.cursor = 'crosshair';
  } else {
    document.body.style.cursor = 'arrow';
  }
})

function changeMode(mode) {
  return currentMode = mode;
}

let canvasX;
let canvasY;
let canvasTop = canvasContainer.offsetTop;
let canvasLeft = canvasContainer.offsetLeft;
let ctx;
// let ctx = canvas.getContext('2d', { willReadFrequently: true });

function handleDraw(canvas) {
  if (!canvas) {
    throw new Error('Canvas not supported!');
  }
  if (!Layer) {
    console.log('No, layer module');
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
    layerContainer.forEach( layer => {
      if (layer.layer_name === currentLayer) {
        layer.image_data = ctx.getImageData(10, 10, Canvas_Width, Canvas_Height);
      }
    })
  });
}

// Key functions
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

brushSizeInput.addEventListener('input', handleBrushSize);

function handleBrushSize(e) {
  let val = e.target.value
  changeBrushSize(val);
}

mainColorPicker.addEventListener('input', handleMainColor);
secondColorPicker.addEventListener('input', handleSecondColor);

function handleMainColor(e) {
  Main_Color = ctx.strokeStyle = e.target.value;
}
function handleSecondColor(e) {
  Second_Color = e.target.value;
}

function switchColor(e) {
  [ Main_Color, Second_Color ] = [ Second_Color, Main_Color];
  mainColorPicker.value = Main_Color;
  secondColorPicker.value = Second_Color;
}

clearBtn.addEventListener('click', (e) => {
  ctx.clearRect(0, 0, Canvas_Width, Canvas_Height);
  fillArea('canvas');
})
canvasWidthInput.addEventListener('input', (e) => {
  // Canvas_Width = canvas.width = e.target.value;
})
canvasHeightInput.addEventListener('input', (e) => {
  // Canvas_Height = canvas.height = e.target.value;
})

function fillArea(element) {
  if (element === 'canvas') {
    // ctx.fillStyle = "#f2f2f2";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    return;
  }
}

function changeBrushSize(val) {
  Brush_Size = ctx.lineWidth = val;
  brushSizeInput.value = Brush_Size;
}

// Layer Module
let layerCount = 0;
const layerContainer = [];

const addLayerBtn = document.querySelector('#addLayerBtn');
const layerWrapper = document.querySelector('#layerWrapper');
const currentLayerText = document.querySelector('#currentLayerText');

addLayerBtn.addEventListener('click', e => {
  addNewLayer();
})

function addNewLayer() {
  const canvasElement = document.createElement('canvas');
  canvasElement.width = Canvas_Width;
  canvasElement.height = Canvas_Height;
  canvasElement.classList.add('canvas-element');
  canvasElement.style.position = 'absolute';
  canvasElement.style.zIndex = layerCount;
  canvasElement.dataset.seq = layerCount;

  // canvasElement. = 'canvas';

  handleDraw(canvasElement);
  let layerName = layerCount === 0 ? 'Background' : `layer ${layerCount-1}`
  const newLayer = new Layer(canvasElement.getContext('2d'), layerName, layerCount);
  layerContainer.push(newLayer);
  setCurrentLayer(newLayer);
  canvasContainer.appendChild(canvasElement);
  ctx = canvasElement.getContext('2d', { willReadFrequently: true });
  console.log(layerCount);
  if (layerCount === 0) {
    ctx.fillStyle = "#f2f2f2";
    ctx.fillRect(0, 0, Canvas_Width, Canvas_Height);
  }
  layerCount ++;
  updateLayerContainer();
}

function setCurrentLayer(layer) {
  currentLayer = layer.layer_name;
  currentLayerText.textContent = currentLayer;
  const test = document.querySelectorAll('.canvas-element');
  test.forEach(canvas => {
    if (parseInt(canvas.dataset.seq) === layer.layer_id) {
      ctx = canvas.getContext('2d', { willReadFrequently: true });
    }
  })
  updateLayerContainer();
}

function updateLayerContainer() {
  layerWrapper.innerHTML = ``;
  if (!layerContainer.length) return;
  layerContainer.forEach( layer => {
    const template = `
      <div id="layerSpan">
        <button id="displayLayerBtn">eye</button>
        <span id="layer-name">${layer.layer_name}</span>
        <button id="deleteLayerBtn">X</button>
        <button id="clearLayerBtn">c</button>
      <div>
      `;
    const child = document.createElement('div');
    child.innerHTML = template;
    child.classList.add('layer-span');
    child.addEventListener('click', e => {
      setCurrentLayer(layer);
    })
    if (layer.layer_name === currentLayer) {
      child.classList.add('active-layer');
    }
    layerWrapper.appendChild(child);

    const deleteLayerBtn = child.querySelector('#deleteLayerBtn');
    deleteLayerBtn.addEventListener('click', e => {
      deleteLayer(layer);
    });
    const displayLayerBtn = child.querySelector('#displayLayerBtn');
    displayLayerBtn.addEventListener('click', e => {
      toggleLayerDisplay(layer);
    });
    const clearLayerBtn = child.querySelector('#clearLayerBtn');
    displayLayerBtn.addEventListener('click', e => {
      layer.clearLayer();
    });
  })
}

function deleteLayer(layer) {
  layer.is_display = layer.is_display;
}

function toggleLayerDisplay(layer, element) {
  const canvasElements = document.querySelectorAll('.canvas-element');
  canvasElements.forEach((element) => {
    if (parseInt(element.dataset.seq) === layer.layer_id) {
      layer.is_display = !layer.is_display;
      element.style.display = layer.is_display ? 'block' : 'none';
    }
  });
}
