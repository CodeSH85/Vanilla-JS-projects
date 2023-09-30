/*
  Layer Module:
  Should expose as a constructor
  allow main function to construct a new layer
  approach: Class?
*/
class Layer {
  #_layerId;
  #_isActive = true;
  #_isDisplay = true;
  opacity = 100;
  #_imageData;

  constructor(id, imageData, layerName, zIndex) {
    this.layer_name = layerName;
    this.#_layerId = id;
    this.#_imageData = imageData;
    this.zIndex = zIndex;
  }
  draw() {}
  get LayerId() {
    return this.#_layerId;
  }
  get imageData() {
    return this._imageData;
  }
  toggleDisplay() {
    this.#_isDisplay = !this.#_isDisplay;
  }
  toggleActive() {
    this.#_isActive = !this.#_isActive;
  }
  changeOpacity(value) {
    this.opacity = value;
  }
  clearLayer() {
    this.#_imageData = null;
  }
  deleteLayer() {
  }
}

class LayerList {
  layers = [];
  constructor() {
    // items of layer
  }
  addLayer(layer) {
    this.layers.push(layer);
  }
  reorderLayer() {
    this.layers = this.layers.sort((a, b) => {
      return a.id > b.id;
    });
  }
  deleteLayer(layer) {
    layer.deleteLayer();
  }
}

export { Layer, LayerList };
