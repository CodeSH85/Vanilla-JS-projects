class Layer {
  #layerId = this.#getUID();
  #imageData;
  #isDisplay = true;
  #active = true;
  #opacity = 100;
  #layerName;
  #zIndex = 1;
  constructor({imageData, layerName}) {
    if (imageData) this.#imageData = imageData;
    if (layerName) this.#layerName = layerName;
  }

  get layerId() {
    return this.#layerId;
  }

  get layerName() {
    return this.#layerName;
  }
  set layerName(newName) {
    this.#layerName = newName;
  }

  get zIndex() {
    return this.#zIndex;
  }
  set zIndex(value) {
    this.#zIndex = value;
  }

  get opacity() {
    return this.#opacity;
  }
  set opacity(value) {
    if (
      typeof value === 'number' &&
      value >= 0 &&
      value <= 100
    ) {
      this.#opacity = value;
    } else {
      throw new Error('Opacity must be between 0 and 100.');
    }
  }

  get active() {
    return this.#active;
  }
  set active(value) {
    this.#active = value;
  }

  toggleDisplay() {
    this.#isDisplay = !this.#isDisplay;
  }
  clearLayer() {
    this.#imageData = null;
  }
  #getUID() {
     const timestampPrefix = Date.now().toString(36);
     const randomString = Math.random().toString(36).substring(2, 10);
     const uid = `${timestampPrefix}-${randomString}`;
     return uid;
  }
}

class LayerList {
  layers = []; // items of layer
  constructor() {
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
