import { getEle, createEle } from "../../../utils/helpers.js";

export default class LayerView {
  constructor() {
    this.layerContainer = getEle('#layerContainer');
    this.deleteLayerBtn = getEle('#addLayerBtn');
    this.addLayerBtn = getEle('#addLayerBtn');
  }
  renderLayers(layers) {
    this.layerContainer.innerHTML = '';
    for (const [key, layer] of layers) {
      const layerElement = createEle(
        'div',
        { class: 'layer-item' },
        layer.name
      );
      this.layerContainer.appendChild(layerElement);
    };
  }
  bindAddLayer(handler) {
    this.addLayerBtn.addEventListener('click', e => {
      const result = handler();
      
    });
  }
  bindDeleteLayer(handler) {
    this.deleteLayerBtn.addEventListener('click', handler);
  }
}