import { LayerItem, LayerList } from "./Layer/LayerModel.js";
import { ToolBar } from "./ToolBar.js";
import { getEle } from "../../utils/helpers.js";
import toolbarConfig from "./toolbar_setting.json" with { type: "json" };
import LayerController from "./Layer/LayerController.js";
import LayerView from "./Layer/LayerView.js";

const Layer = new LayerController(new LayerView(), new LayerList());
const toolbar = new ToolBar(toolbarConfig.toolsConfig.brushToolOptions.options);

const toolbarView = getEle('#toolbar');
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

const layerSection = getEle('#layerSecContainer');

function renderLayerSection() {
  layerSection.innerHTML = '';
}

function addLayer(layer) {
  layerList.addLayer(layer);
}

const resizeController = getEle('#resizeControl');
const resizeLPanel = getEle('#panelLeft');
const resizeRPanel = getEle('#panelRight');
resizeController.addEventListener('mousedown', reSizer);
function reSizer(e) {
  document.addEventListener('mousemove', mousemove);
  document.addEventListener('mouseup', mouseup);
  
  let prevX = e.x;
  const leftPanel = resizeLPanel.getBoundingClientRect();
  
  function mousemove(e) {
    let newX = prevX - e.x;
    resizeLPanel.style.width = leftPanel.width - newX - 16 + "px";
  }
  
  function mouseup() {
    document.removeEventListener('mousemove', mousemove);
    document.removeEventListener('mouseup', mouseup); 
  }
}
