/*
  layer module:
  Should expose as a constructor
  allow main function to construct a new layer
  approach: Class?
*/
class Layer {
  constructor(imageData, layerName, id) {
    this.image_data = imageData;
    this.layer_name = layerName;
    this.layer_id = id;
    this.is_Active = true;
    this.is_display = true;
    this.opacity = 100;
  }
  toggleDisplay() {
    this.is_display = !this.is_display;
  }
  changeOpacity(value) {
    this.opacity = value;
  }
  clearLayer() {
    this.image_data = null;
  }
}

export default Layer;
