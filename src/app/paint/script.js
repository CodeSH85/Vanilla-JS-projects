
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
  if (!canvas) {
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
  if (e.key === 'x') {
    switchColor();
  }
})

function switchColor(e) {
  [ mainColor, secondColor ] = [ secondColor, mainColor];
  mainColorPicker.value = mainColor;
  secondColorPicker.value = secondColor;
}

const addLayerBtn = document.querySelector('#addLayerBtn');
const layerContainer = document.querySelector('#layerContainer');

const layers = new Proxy([], {
  get: (target, index) => {
    return target[index];
  },
  set: (target, index, value) => {
    const li = document.createElement('li');
    li.classList = ['py-1 px-3 border-2 border-red']
    target[index] = value;
    li.textContent = value.order;
    layerContainer.appendChild(li);
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
  layerContainer.appendChild(list);
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

