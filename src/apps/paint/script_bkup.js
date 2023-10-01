import Layer from "./Layer.js";
import toolbar_setting from "./toolbar_setting.json" assert { type: "json" };

// init
document.addEventListener('DOMContentLoaded', () => {
  fillArea('canvas');
  addNewLayer();
  setToolbar();
  setFooter();
  mainColorPicker.value = Main_Color;
  secondColorPicker.value = Second_Color;
  canvasWidthInput.value = Canvas_Width;
  canvasHeightInput.value = Canvas_Height;
  // brushSizeInput.value = ctx.lineWidth = Brush_Size;
  // brushSizeInput.addEventListener('input', handleBrushSize);
  canvasContainer.style.width = Canvas_Width;
  canvasContainer.style.height = Canvas_Height;

})

// DOM Elements
let brushSizeInput;
const canvasContainer = document.querySelector('.canvas-container'),
      // brushSizeInput = document.querySelector('#brushSize'),
      footerToolBar = document.querySelector('#footerToolbar'),
      mainColorPicker = document.querySelector('#mainColorPicker'),
      secondColorPicker = document.querySelector('#secondColorPicker'),
      clearBtn = document.querySelector('#clearCanvas'),
      canvasWidthInput = document.querySelector('#canvasWidth'),
      canvasHeightInput = document.querySelector('#canvasHeight'),
      shapeBtn = document.querySelector('#shapeBtn'),
      brushBtn = document.querySelector('#brushBtn'),
      toolbar = document.querySelector('#toolbar');

let mouseX, mouseY;

// Tool Settings
let Canvas_Width = 500,
    Canvas_Height = 500,
    Main_Color = '#ff0000',
    Second_Color = '#00ffff',
    Brush_Size = 3;

// flag
let currentMode = 'brush',
    isMouseDown = false,
    currentLayer = '';

let canvasX,
    canvasY,
    offsetX,
    offsetY,
    canvasTop = canvasContainer.offsetTop,
    canvasLeft = canvasContainer.offsetLeft,
    ctx;
// let ctx = canvas.getContext('2d', { willReadFrequently: true });

function handleDraw(canvas) {
  if (!canvas) {
    throw new Error('Canvas not supported!');
  }
  if (!Layer) {
    throw new Error('No layer module');
  }
  canvas.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    ctx.beginPath();
    // canvasX = e.clientX - canvasLeft;
    // canvasY = e.clientY - canvasTop;
    canvasX = e.offsetX;
    canvasY = e.offsetY;
    ctx.moveTo(canvasX, canvasY);
  });
  
  canvas.addEventListener('mousemove', (e) => {
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    setMouseCoordinate();
    
    if (!isMouseDown) {
      e.preventDefault();
      return;
    }

    // canvasX = e.clientX - canvasLeft;
    // canvasY = e.clientY - canvasTop;
    canvasX = e.offsetX;
    canvasY = e.offsetY;
    ctx.lineTo(canvasX, canvasY);
    ctx.strokeStyle = Main_Color;
    ctx.stroke();
  });

  canvas.addEventListener('mouseup', (e) => {
    isMouseDown = false;
    ctx.closePath();
    layerContainerArr.forEach( layer => {
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

// brushSizeInput.addEventListener('input', handleBrushSize);

function handleBrushSize(e) {
  let val = e.target.value;
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
const layerContainerArr = [];
let layerCount = 0;

const addLayerBtn = document.querySelector('#addLayerBtn');
const layerWrapper = document.querySelector('#layerWrapper');
const currentLayerText = document.querySelector('#currentLayerText');

addLayerBtn.addEventListener('click', e => {
  addNewLayer();
})

function addNewLayer() {
  
  const canvasElement = document.createElement('canvas');
  
  let layerName = layerCount === 0 ? 'Background' : `layer ${layerCount}`;
  const newLayer = new Layer(canvasElement.getContext('2d'), layerName, layerCount, layerCount+1);

  // canvas
  canvasElement.width = Canvas_Width;
  canvasElement.height = Canvas_Height;
  canvasElement.classList.add('canvas-element');
  canvasElement.style.position = 'absolute';
  canvasElement.style.zIndex = newLayer.z_index;
  canvasElement.dataset.seq = newLayer.layer_id;
  handleDraw(canvasElement);
  canvasContainer.appendChild(canvasElement);

  // layer
  layerContainerArr.push(newLayer);
  setCurrentLayer(newLayer);

  ctx = canvasElement.getContext('2d', { willReadFrequently: true });
  if (layerCount === 0) {
    ctx.fillStyle = "#f2f2f2";
    ctx.fillRect(0, 0, Canvas_Width, Canvas_Height);
  }
  
  layerCount ++;

  updateLayerContainerArr();
}

function setCurrentLayer(layer) {

  currentLayer = layer.layer_name;
  currentLayerText.textContent = currentLayer;

  let canvasList = Array.from(canvasContainer.children);
  canvasList.forEach((canvas, index) => {
    if (parseInt(canvas.dataset.seq) === layer.layer_id) {
      ctx = canvas.getContext('2d', { willReadFrequently: true });
      console.log('z-index:', canvas.style.zIndex);
      console.log('layerWrapper', layerWrapper);
    }
  })
  updateLayerContainerArr();
}

let draggedItem = null;
function updateLayerContainerArr() {
  const zIndexMap = [];
  let list = Array.from(canvasContainer.children);

  layerWrapper.innerHTML = '';
  if (!layerContainerArr.length) return;

  layerContainerArr.forEach((layer, index) => {

    const template = 
    `
      <div id="layerSpan" class="layer-span">
        <button class="layer-opt-btn display-btn" id="displayLayerBtn">eye</button>
        <input value="${layer.layer_name}" class="layerName" id="layer${layer.layer_name}">
        <button id="deleteLayerBtn">X</button>
        <button id="clearLayerBtn">c</button>
      </div>
    `;

    // layer insert span for reorder
    const layerInsert = document.createElement('span');
    
    layerInsert.dataset.seq = index;
    layerInsert.classList.add('layer-insert-holder');
  
    layerInsert.addEventListener('dragover', e => {
      e.preventDefault();
      e.target.classList.add('drag-over-layer-insert');
    })
    layerInsert.addEventListener('dragleave', e => {
      e.target.classList.remove('drag-over-layer-insert');
    })
    layerInsert.addEventListener('drop', e => {
      e.preventDefault();
      if (e.target.classList.contains('drag-over-layer-insert')) {
        e.target.classList.remove('drag-over-layer-insert');
      }
      moveTo(draggedItem.dataset.seq, layerInsert.dataset.seq);
    })
    // layerInsert.textContent = index;
    layerInsert.style.color = '#ffffff';
    //

    // layerWrapper.appendChild(layerInsert);

    const child = document.createElement('div');
    
    child.draggable = true;
    child.innerHTML = template;
    child.dataset.seq = index + 1;
    child.addEventListener('click', e => {
      setCurrentLayer(layer);
    })

    child.addEventListener('dragstart', e => {
      draggedItem = child;
      layerWrapper.style.borderWidth = `2px`;
      layerWrapper.style.borderColor = `#0000ff`;
      layerWrapper.style.borderStyle = `solid`;
    })
    child.addEventListener('dragend', e => {
      layerWrapper.style.borderWidth = `0px`;
      layerWrapper.style.borderColor = `#0000ff`;
      layerWrapper.style.borderStyle = `solid`;
    })

    if (layer.layer_name === currentLayer) {
      child.classList.add('active-layer');
    }
    
    list.forEach((canvas, canvasIndex) => {
      if (parseInt(canvas.dataset.seq) === layer.layer_id) {
        canvas.style.zIndex = index + 1;
      }
    });

    layerWrapper.appendChild(child);
    layerWrapper.insertBefore(layerInsert, child);
    
    if (index === layerCount - 1 ) {
      const layerInsert = document.createElement('span');
      layerInsert.dataset.seq = index + 1;

      layerInsert.style.color = '#ffffff';
      layerInsert.classList.add('layer-insert-holder');
      layerWrapper.appendChild(layerInsert);
      layerInsert.addEventListener('dragover', e => {
        e.preventDefault();
        e.target.classList.add('drag-over-layer-insert');
      })
      layerInsert.addEventListener('dragleave', e => {
        e.target.classList.remove('drag-over-layer-insert');
      })
      layerInsert.addEventListener('drop', e => {
        e.preventDefault();
        if (e.target.classList.contains('drag-over-layer-insert')) {
          e.target.classList.remove('drag-over-layer-insert');
        }
        moveTo(draggedItem.dataset.seq, layerInsert.dataset.seq);
      })
    }

    const layerNameText = child.querySelector('.layerName');
    layerNameText.addEventListener('dblclick', e => {
      // rename
      console.log(e.target);
    });
    const deleteLayerBtn = child.querySelector('#deleteLayerBtn');
    deleteLayerBtn.addEventListener('click', e => {
      e.stopPropagation();
      deleteLayer(layer);
    });
    const displayLayerBtn = child.querySelector('#displayLayerBtn');
    displayLayerBtn.addEventListener('click', e => {
      e.stopPropagation();
      toggleLayerDisplay(layer);
    });
    const clearLayerBtn = child.querySelector('#clearLayerBtn');
    clearLayerBtn.addEventListener('click', e => {
      e.stopPropagation();
      layer.clearLayer();
    });
    zIndexMap.push(index);
  })

}

function moveTo(from, to) {

  if (parseInt(from - 1) === parseInt(to)) return;

  // layerContainerArr.splice(to, layerContainerArr[to], layerContainerArr.splice(from-1, 1)[0]);
  layerContainerArr.splice(to, 0, layerContainerArr.splice(from - 1, 1)[0]);
  
  updateLayerContainerArr();

}

function toggleLayerDisplay(layer) {
  const canvasElements = document.querySelectorAll('.canvas-element');
  canvasElements.forEach((element) => {
    if (parseInt(element.dataset.seq) === layer.layer_id) {
      layer.is_display = !layer.is_display;
      element.style.display = layer.is_display ? 'block' : 'none';
    }
  })
}

function deleteLayer(layer) {
  const targetIndex = layerContainerArr.findIndex(la => la.layer_id === layer.layer_id);
  layerContainerArr.splice(targetIndex, 1);
  updateLayerContainerArr();
}

function clearLayer(layer) {
  layerContainerArr.image_data = [];
  const canvasElements = document.querySelectorAll('.canvas-element');
  canvasElements.forEach((element) => {
    if (parseInt(element.dataset.seq) === layer.layer_id) {
      // element.style
    }
  })
  updateLayerContainerArr();
}

// mode & toolbar
function changeMode(event) {
  let value = event.target.dataset.mode;
  currentMode = value;
  setToolbar();
}

const modeBtnContainer = [brushBtn, shapeBtn];
modeBtnContainer.forEach( btn => {
  btn.addEventListener('click', changeMode)
})

function setToolbar() {
  toolbar.innerHTML = ``;

  const frag = document.createDocumentFragment();

  // toolbar_setting.brush_tool_options.forEach( opt => {
  toolbar_setting[`${currentMode}_tool_options`].forEach( opt => {
    const li = document.createElement('li');
    let template = 
    `
      <label for="${opt.key}">${opt.title}</label>
    `
    li.innerHTML = template;
    if (opt.type === 'input') {
      const input = document.createElement('input');
      input.id = opt.key;
      input.type = 'number';
      li.appendChild(input);
      if (opt.key === 'brushSize') {
        input.value = Brush_Size;
        input.addEventListener('input', handleBrushSize);
        brushSizeInput = input;
      }
    }
    if (opt.type === 'select') {
      const select = document.createElement('select');
      li.appendChild(select);
    }
    frag.appendChild(li);
  })

  toolbar.appendChild(frag);
}

function setMouseCoordinate() {
  mouseX.textContent = offsetX;
  mouseY.textContent = offsetY;
}

function setFooter() {
  toolbar_setting['footer-tool-config'].forEach(opt => {
    const li = document.createElement('li');
    let template = 
    `
    <span>
      ${opt.title}:
      <span id="${opt.key}"> ${0}</span>
    <span>
    `
    li.innerHTML = template;
    footerToolBar.appendChild(li);
  })
  mouseX = footerToolBar.querySelector('#mouseX');
  mouseY = footerToolBar.querySelector('#mouseY');
}

// resize module
const resizeBar = document.querySelector('#resizeControl');
const leftPanel = document.querySelector('#panelLeft');
const rightPanel = document.querySelector('#panelRight');

let isResize;
resizeBar.addEventListener('mousedown', e => {
  isResize = true;
  // leftPanel.style.width = '200px';
})
resizeBar.addEventListener('mousemove', e => {
  if (!isResize) return;
})
resizeBar.addEventListener('mouseup', e => {
  leftPanel.style.width = '100%';
  isResize = false;
})


