import { createEle, getEle } from '../../utils/helpers.js';
import enableDrag from './drag.js';
import { DragSelectBox } from './dragSelection.js';

// let dragRect = document.createElement('div');
const selectArea = getEle('#selectArea');

document.addEventListener('DOMContentLoaded', () => {
  createObjs();
})

const dragSelectBox = new DragSelectBox({
  targetNode: selectArea,
  className: 'drag-rect',
  options: {
  }
});
const objCounts = 5;
function createObjs() {
  for (let i = 0; i < objCounts; i++) {
    const objElement = createEle('div');
    objElement.className = 'drag';
    selectArea.appendChild(objElement);
  }
}
