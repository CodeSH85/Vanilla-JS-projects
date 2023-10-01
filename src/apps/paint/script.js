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
resizeController.addEventListener('mousedown', handleResize);
resizeController.addEventListener('mousemove', handleResize);
resizeController.addEventListener('mouseup', handleResize);
// resizeController.addEventListener('drop', handleResize);

let isDragging = false;
function handleResize(e) {
  let startX = 0;
  let currentX = 0;
  if (e.type === 'mousedown') {

    isDragging = true;
    startX = e.clientX;

  } else if (e.type === 'mousemove') {

    if (!isDragging) return;

    const lw = getStyle(resizeLPanel, 'width', true);
    const rw = getStyle(resizeRPanel, 'width', true);
    console.log(lw, rw);
    currentX = e.clientX;
    let movement = currentX - startX;
    console.log(movement);
    if (movement > 0) {
      // r
      resizeLPanel.style.width = `${lw + movement}px`;
    } else {

    }
  } else if (e.type === 'mouseup'){
    isDragging = false;
  }
}