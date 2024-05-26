import { createEle, getEle } from "../../../utils/helpers.js"

export default class BoardView {
  constructor() {
    this.width = 500;
    this.height = 600;
    this.canvasContainer = getEle('#canvasContainer');
    this.canvas = null;
    this.ctx;
  }
  renderBoard() {
    this.canvas = createEle(
      'canvas',
      { 
        class: 'canvas',
        width: this.width,
        height: this.height
      }
    );
    this.canvasContainer.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
  bindBoardMousedown(handler) {
    this.canvas.addEventListener('mousedown', e => {
      let canvasX = e.offsetX;
      let canvasY = e.offsetY;
      this.ctx.strokeStyle = '#000000';
      this.ctx.lineTo(canvasX, canvasY);
      this.ctx.stroke();
      handler(e);
      this.render();
    })
  }
  render() {
    
  }
}
