import enableDrag from './drag.js';

let currentMode = 'select';

const handler = {
  get: () => {

  },
  set: () => {
    
  } 
}

let mode = new Proxy([], handler);

let startX = 0;
let startY = 0;

let dragRect = document.createElement('div');
const selectArea = document.querySelector('#selectArea');
const item = document.querySelector('.drag');

selectArea.addEventListener('mouseenter', e => {
  if (currentMode !== 'select') {
    return;
  };
  if (selectArea.contains(dragRect)) {
    selectArea.removeChild(dragRect);
  };
})

selectArea.addEventListener('mousedown', e => {
  if (e.target.classList.contains('drag')) {
    currentMode = 'drag';
    enableDrag('.drag', '#selectArea');
    return;
  }
  currentMode = 'select';
  if (selectArea.contains(dragRect)) {
    selectArea.removeChild(dragRect);
  };

  startX = e.clientX - e.target.offsetLeft;
  startY = e.clientY - e.target.offsetTop;

  dragRect = document.createElement('div');
  dragRect.classList.add('drag-rect');
  dragRect.style.left = `${startX}px`;
  dragRect.style.top = `${startY}px`;
  selectArea.appendChild(dragRect);
  selectArea.addEventListener('mousemove', handleMouseMove);
  selectArea.addEventListener('mouseup', handleMouseUp)
})

function handleMouseMove(e) {

  let currentX = e.clientX - selectArea.offsetLeft - startX;
  let currentY = e.clientY - selectArea.offsetTop - startY;

  dragRect.style.left = `${Math.min(startX + currentX, startX)}px`;
  dragRect.style.top = `${Math.min(startY + currentY, startY)}px`;
  dragRect.style.width = `${Math.abs(currentX)}px`;
  dragRect.style.height = `${Math.abs(currentY)}px`;
}

function handleMouseUp(e) {
  const selectionArea = dragRect.getBoundingClientRect();
  const targetElement = item.getBoundingClientRect();
  if (
    selectionArea.left <= targetElement.right &&
    selectionArea.right >= targetElement.left &&
    selectionArea.top <= targetElement.bottom &&
    selectionArea.bottom >= targetElement.top
  ) {
    item.classList.add('selected');
  } else {
    item.classList.remove('selected');
  };

  // remove the drag rectangle from the DOM
  if (selectArea.contains(dragRect)) {
    selectArea.removeChild(dragRect);
  };
  selectArea.removeEventListener('mousemove', handleMouseMove);
  selectArea.removeEventListener('mouseup', handleMouseUp);
}

function cancelDefault(e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}
