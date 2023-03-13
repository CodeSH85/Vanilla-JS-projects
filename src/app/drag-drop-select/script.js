
import enableDrag from './drag.js';

let currentMode = '';

let startX;
let startY;

let dragRect = document.createElement('div');
const selectArea = document.querySelector('#selectArea');
const item = document.querySelector('.drag');

let currentItem = null;

if (currentMode == 'drag') {
  enableDrag('.drag', '#selectArea');
}

selectArea.addEventListener('mouseenter', e => {
  if (currentMode !== 'select') {
    return;
  };
  if (selectArea.contains(dragRect)) {
    selectArea.removeChild(dragRect);
  };
})

selectArea.addEventListener('mousedown', e => {
  if(e.target.id === 'target') {
    currentMode = 'drag';
    return;
  }
  currentMode = 'select';
  if (currentMode !== 'select') {
    return;
  };
  if (selectArea.contains(dragRect)) {
    selectArea.removeChild(dragRect);
  };
  startX = e.clientX - e.target.offsetLeft;
  startY = e.clientY - e.target.offsetTop;
  dragRect = document.createElement('div');
  dragRect.style =
    `position: absolute; height: 0px; width: 0px; z-index: 999; pointer-events: none;
      background-color: rgba(123, 123, 123, 0.5); top: ${startY}px; left: ${startX}px;
    `;
  selectArea.appendChild(dragRect);
  selectArea.addEventListener('mousemove', handleMouseMove);
  selectArea.addEventListener('mouseup', handleMouseUp)
})

function cancelDefault(e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}

function handleMouseMove(e) {
  let currentX = e.clientX - selectArea.offsetLeft - startX;
  let currentY = e.clientY - selectArea.offsetTop - startY;
  if (currentX < 0) {
    dragRect.style.left = `${startX + currentX}px`;
    dragRect.style.width = `${-currentX}px`;
  } else {
    dragRect.style.left = `${startX}px`;
    dragRect.style.width = `${currentX}px`;
  };
  if (currentY < 0) {
    dragRect.style.top = `${startY + currentY}px`;
    dragRect.style.height = `${-currentY}px`;
  } else {
    dragRect.style.top = `${startY}px`;
    dragRect.style.height = `${currentY}px`;
  };
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
