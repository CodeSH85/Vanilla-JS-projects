/*
  layer module:
  Should expose as a constructor
  allow main function to construct a new layer
  approach: Class?
*/
class layer {
  constructor(imageData, layerName) {
    this.image_data = imageData;
    this.layer_name = layerName;
    this.is_Active = true;
    this.is_display = true;
  }
  clearLayer() {
    this.image_data = null;
  }
}

export default layer;
