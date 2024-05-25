class LayerItem {
  id = this.getUID();
  imageData;
  isDisplay = true;
  active = true;
  opacity = 100;
  name;
  zIndex = 1;
  constructor({ imageData, name }) {
    if (imageData) this.imageData = imageData;
    if (name) this.name = name;
  }

  getLayerId() {
    return this.layerId;
  }
  getLayerName() {
    return this.layerName;
  }
  setLayerName(newName) {
    this.layerName = newName;
  }
  getZIndex() {
    return this.zIndex;
  }
  setZIndex(value) {
    this.zIndex = value;
  }
  getOpacity() {
    return this.opacity;
  }
  setOpacity(value) {
    if (
      typeof value === 'number' &&
      value >= 0 &&
      value <= 100
    ) {
      this.opacity = value;
    } else {
      throw new Error('Opacity must be between 0 and 100.');
    }
  }

  getActive() {
    return this.active;
  }
  setActive(value) {
    this.active = value;
  }
  toggleDisplay() {
    this.isDisplay = !this.isDisplay;
  }
  clearLayer() {
    this.imageData = null;
  }
  getUID() {
     const timestampPrefix = Date.now().toString(36);
     const randomString = Math.random().toString(36).substring(2, 10);
     const uid = `${timestampPrefix}-${randomString}`;
     return uid;
  }
}

class LayerList {
  layers = new Map();
  constructor() {
  }
  getLayerNumbers() {
    return this.layers.size;
  }
  addLayer(layer) {
    this.layers.set(layer.id, layer);
    console.log(this.layers);
  }
  setLayers(layers) {
    this.layers = layers;
  }
  getLayers() {
    return this.layers;
  }
  reorderLayer() {
    this.layers = this.layers.sort((a, b) => {
      return a.id > b.id;
    });
  }
  deleteLayer(layer) {
    layers.delete(layer.id);
  }
}

export { LayerItem, LayerList };
