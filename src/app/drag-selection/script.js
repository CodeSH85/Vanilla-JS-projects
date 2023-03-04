const selectArea = document.querySelector('#selectArea');

let startX;
let startY;
let dragRect = document.createElement('div');

// const test = document.querySelector('#target');

for(let i = 0; i < 10; i++) {
  const item = document.createElement('div');
  item.textContent = 'item';
  item.id = 'target';
  item.classList.add('card');
  selectArea.appendChild(item);
}

const items = document.querySelectorAll('#target');

selectArea.addEventListener('mousedown', e => {
  startX = e.clientX - e.target.offsetLeft;
  startY = e.clientY - e.target.offsetTop;
  dragRect = document.createElement('div');
  dragRect.style =
    `position: absolute; height: 0px; width: 0px; z-index: 999; pointer-events: none;
      background-color: rgba(123, 123, 123, 0.5); top: ${startY}px; left: ${startX}px;
    `;
  selectArea.appendChild(dragRect);
})

selectArea.addEventListener('mousemove', handleMouseMove);

function handleMouseMove(e) {
  let curX = e.clientX - selectArea.offsetLeft - startX;
  let curY = e.clientY - selectArea.offsetTop - startY;
  if (curX < 0) {
    dragRect.style.left = `${startX + curX}px`
    dragRect.style.width = `${-curX}px`
  } else {
    dragRect.style.left = `${startX}px`
    dragRect.style.width = `${curX}px`
  }
  if (curY < 0) {
    dragRect.style.top = `${startY + curY}px`
    dragRect.style.height = `${-curY}px`
  } else {
    dragRect.style.top = `${startY}px`
    dragRect.style.height = `${curY}px`
  }
  dragRect.style.width = curX + 'px';
  dragRect.style.height = curY + 'px';
}

selectArea.addEventListener('mouseup', e => {

  const selectionArea = dragRect.getBoundingClientRect();

  // loop through all the items and check if their boundaries intersect with the drag rectangle
  items.forEach(item => {
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
    }
  });

  // remove the drag rectangle from the DOM
  if (selectArea.contains(dragRect)) {
    selectArea.removeChild(dragRect);
  }
})

