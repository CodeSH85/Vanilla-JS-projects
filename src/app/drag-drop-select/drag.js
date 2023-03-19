function enableDrag(dragClass, dropSection) {
  const dragItems = document.querySelectorAll(dragClass);
  const dropArea = document.querySelector(dropSection);

  if (!dragItems || !dropArea) {
    throw new Error('Invalid CSS');
  }

  let currentItem = null;

  (function setDraggable(target) {
    for (let i = 0; i < target.length; i++) {
      const element = target[i];
      if (!element.draggable) {
        element.draggable = true;
        element.style.position = 'absolute';
      }
      if (element.children.length) {
        setDraggable(element.children);
      }
      element.addEventListener('dragstart', handleDragStart);
    }
  })(dragItems);

  function handleDragStart(e) {
    currentItem = e.target;
    currentItem.addEventListener('drag', handleDrag);
    currentItem.addEventListener('dragend', handleDragEnd);
  }

  function handleDrag(e) {
    disableDefault(e);
    const x = e.clientX;
    const y = e.clientY;
    currentItem.style.left = x + 'px';
    currentItem.style.top = y + 'px';
  }

  function handleDragEnd(e) {
    disableDefault(e);
    currentItem.removeEventListener('dragstart', handleDrag);
    currentItem.removeEventListener('drag', handleDragEnd);
  }

  dropArea.addEventListener('drop', handleDrop);
  dropArea.style.position = 'relative';

  dropArea.addEventListener('dragenter', e => {
    disableDefault(e);
  })
  dropArea.addEventListener('dragover', e => {
    disableDefault(e);
  })

  function handleDrop(e) {
    disableDefault(e);
    if (currentItem !== null) {
      currentItem.style.left = e.clientX - selectArea.offsetLeft + 'px';
      currentItem.style.top = e.clientY - selectArea.offsetTop + 'px';
    }
  }

  function disableDefault(e) {
    e.preventDefault();
  }
}

export default enableDrag;