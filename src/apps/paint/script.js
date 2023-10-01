import { Layer, LayerList } from "./Layer.js";
import { ToolBar } from "./ToolBar.js";
import { qs } from "../../utils/qs.js";
import getStyle from "../../utils/getStyle.js";
import toolbarConfig from "./toolbar_setting.json" assert { type: "json" };



const layer = new Layer('aaa', 's', 1);
const layerList = new LayerList();
layerList.addLayer(layer);

const toolbar = new ToolBar(toolbarConfig.toolsConfig.brushToolOptions.options);

const toolbarView = qs('#toolbar');
toolbar.toolbar.forEach(tool => {
  const item = document.createElement('li');

  item.appendChild(renderDOM(tool));
  toolbarView.appendChild(item);
});

function renderDOM(tool, child) {
  let element = document.createElement(tool.tag);
  if (tool.tag === 'input') {
    element.type = tool.type;
  }
  element.textContent = tool.title;
  return element;
}

const layerSection = qs('#layerSecContainer');

console.log(layerSection);

function renderLayerSection() {
  layerSection.innerHTML = '';
}

function addLayer(layer) {
  layerList.addLayer(layer);
  
}

const resizeController = qs('#resizeControl');
const resizeLPanel = qs('#panelLeft');
const resizeRPanel = qs('#panelRight');
resizeController.addEventListener('mousedown', handleMousedown);
resizeController.addEventListener('mousemove', handleMousemove);
document.addEventListener('mouseup', handleMouseup);
// resizeController.addEventListener('drop', handleResize);

let isDragging = false;
let startX;
let currentX;
function handleMousedown(e) {
  isDragging = true;
  startX = e.clientX;
}
function handleMousemove(e) {
  if (!isDragging) return;
  const lw = getStyle(resizeLPanel, 'width', true);
  const rw = getStyle(resizeRPanel, 'width', true);

  currentX = e.clientX;
  let movement = currentX - startX;
  console.log(movement);

  if (movement > 0) {
    // R
    console.log('R')
    resizeLPanel.style.width = `${lw - Math.abs(movement)}px`;
    // resizeRPanel.style.width = `${rw - movement}px`;
  } else {
    // L
    console.log('L');
    // resizeLPanel.style.width = `${lw - movement}px`;
    resizeRPanel.style.width = `${rw - Math.abs(movement)}px`;
  }
}
function handleMouseup(e) {
  isDragging = false;
}
