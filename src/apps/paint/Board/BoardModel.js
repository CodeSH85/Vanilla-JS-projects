export default class BoardModel {
  constructor() {
    this.imageData = null;
  }
  initBoard() {
    this.imageData = new ImageData(100, 100);
  }
  getImageData() {
    return this.imageData;
  }
  setImageData(e) {
    console.log(e);
    // this.imageData = value;
  }
  clearImageData() {
    this.imageData = null;
  }
}
