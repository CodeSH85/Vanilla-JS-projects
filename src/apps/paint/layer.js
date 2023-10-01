/*
  Layer Module:
  Should expose as a constructor
  allow main function to construct a new layer
  approach: Class?
*/
import { qs } from "../../utils/qs.js";
class Layer {
  #layerId;
  #imageData;
  #isDisplay = true;
  #isActive = true;
  #opacity = 100;
  #layerName;
  zIndex;

  constructor(imageData, layerName, zIndex) {
    this.#layerId = this.#generateUID();
    this.#imageData = imageData;
    this.#layerName = layerName;
    this.zIndex = zIndex;
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
  get opacity() {
    return this.#opacity;
  }
  set opacity(newOpacity) {
    if (newOpacity >= 0 && newOpacity <= 100) {
      this.#opacity = newOpacity;
    } else {
      console.error('Opacity must be between 0 and 100.');
    }
  }

  toggleDisplay() {
    this.#isDisplay = !this.#isDisplay;
  }
  toggleActive() {
    this.#isActive = !this.#isActive;
  }
  clearLayer() {
    this.#imageData = null;
  }
  #generateUID() {
     const timestampPrefix = Date.now().toString(36);
     const randomString = Math.random().toString(36).substring(2, 10);
     const uid = `${timestampPrefix}-${randomString}`;
     return uid;
  }
}


class LayerList {
  layers = []; // items of layer
  constructor() {
    this.layerSection = qs('#layerSecContainer');
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
