import { LayerItem } from "./LayerModel.js";

export default class LayerController {
  model;
  constructor(view, model) {
    this.view = view;
    this.model = model;

    this.view.bindAddLayer(this.handleAddLayer.bind(this));
    this.render();
  }
  handleAddLayer() {
    let layerName = `new layer ${this.model.getLayerNumbers() + 1}`;
    const imageData = new ImageData(100, 100);
    console.log(layerName);
    const newLayer = new LayerItem({ imageData, name: layerName });
    this.model.addLayer(newLayer);
    this.render();
  }
  render() {
    const layers = this.model.layers;
    this.view.renderLayers(layers);
  }
}
