
let currentMode = '';

let startX;
let startY;

let dragRect = document.createElement('div');
const selectArea = document.querySelector('#selectArea');
const item = document.querySelector('#target');

let currentItem = null;

item.addEventListener('dragstart', e => {
  currentItem = e.target;
  currentMode = 'drag';
})
item.addEventListener('drag', e => {
  const x = e.clientX;
  const y = e.clientY;
  e.target.style.left = x + 'px';
  e.target.style.top = y + 'px';
})
item.addEventListener('dragend', e => {
  const x = e.clientX - selectArea.offsetLeft;
  const y = e.clientY - selectArea.offsetTop;
  e.target.style.left = x + 'px';
  e.target.style.top = y + 'px';
  // e.target.style.backgroundColor = 'green';
  currentItem = null;
})

selectArea.addEventListener('dragenter', e => {
  e.preventDefault();
})
selectArea.addEventListener('dragover', e => {
  e.preventDefault();
})
selectArea.addEventListener('drop', e => {
  e.preventDefault();
  if (currentItem !== null) {
    currentItem.style.left = e.clientX - selectArea.offsetLeft + 'px';
    currentItem.style.top = e.clientY - selectArea.offsetTop + 'px';
  }
})

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
