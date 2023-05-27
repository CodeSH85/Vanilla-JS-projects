/*
  layer module:
  Should expose as a constructor
  allow main function to construct a new layer
  approach: Class?
*/
class layer {
  constructor(image_data) {
    this.image_data = image_data;
  }
  clearLayer() {
    this.image_data = null;
  }
}

export default layer