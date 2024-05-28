import { createEle } from '../../utils/helpers.js';

export class DragSelectBox {
  element;
  _targetNode;
  targetElements = new Map();
  selectedElements = new Map();
  startX = 0;
  startY = 0;
  width = 0;
  height = 0;
  left = 0;
  right = 0;
  isMousedown = false;
  constructor({ targetNode, className, targetClass, options }) {
    this._targetNode = targetNode;
    this.element = createEle('div');
    this.element.className = className;
    for (const [key, value] of Object.entries(this.actionList)) {
      this._targetNode.addEventListener(key, value);
    }
  }
  actionList = {
    mousedown: this.onMousedown.bind(this),
    mousemove: this.onMousemove.bind(this),
    mouseup: this.onMouseup.bind(this)
  }
  onMousedown(e) {
    this.isMousedown = true;
    this._targetNode.appendChild(this.element);
    const { offsetX, offsetY } = e;
    this.startX = offsetX;
    this.startY = offsetY;
    this.element.style.left = this.startX + 'px';
    this.element.style.top = this.startY + 'px';
  }
  onMousemove(e) {
    if (!this.isMousedown) return;
    const { offsetX, offsetY } = e;
    this.element.style.left = Math.min(this.startX, offsetX) + 'px';
    this.element.style.top = Math.min(this.startY, offsetY) + 'px';
    this.element.style.width = Math.abs(offsetX - this.startX) + 'px';
    this.element.style.height = Math.abs(offsetY - this.startY) + 'px';
  }
  onMouseup(e) {
    this.isMousedown = false;
    this.element.style.left = 0 + 'px';
    this.element.style.top = 0 + 'px';
    this.element.style.height = 0 + 'px';
    this.element.style.width = 0 + 'px';
    this._targetNode.removeChild(this.element);
  }
  setRange() {
    
  };
}
