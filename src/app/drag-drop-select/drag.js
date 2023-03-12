
function enableDrag(dragClass, dropSection) {
  let done = false;
  const dragItems = document.querySelectorAll(dragClass);
  const dropArea = document.querySelectorAll(dropSection);

  (function setDraggable(target) {
    if (target.length) {
      for (let i = 0; i < target.length; i++) {
        if (!target[i].draggable) {
          target[i].draggable = true;
        }
        if (target[i].childElementCount === 0) {
          continue;
        }
        for(let j = 0; j < target[i].childElementCount; j++) {
          if (!target[i].children[j].draggable) {
            target[i].children[j].draggable = true;
          }
          if (target[i].children[j].childElementCount === 0) {
            continue;
          } else {
            setDraggable(target[i].children[j]);
          }
        }
        target[i].addEventListener('dragstart', handleDragStart);
      }
    } else {
      for (let i = 0; i < target.childElementCount; i++) {
        if (!target.children[i].draggable) {
          target.children[i].draggable = true;
        }
        if (target.children[i].childElementCount === 0) {
          continue;
        }
        for(let j = 0; j < target.children[i].childElementCount; j++) {
          if (!target.children[i].children[j].draggable) {
            target.children[i].children[j].draggable = true;
          }
          if (target.children[i].children[j].childElementCount === 0) {
            continue;
          } else {
            setDraggable(target.children[i].children[j]);
          }
        }
        target.children[i].addEventListener('dragstart', handleDragStart);
      }
    }
  })(dragItems);


  // dragItems.addEventListener('dragstart', e => {
  //   currentItem = e.target;
  //   currentMode = 'drag';
  // })
  // dragItems.addEventListener('drag', e => {
  //   const x = e.clientX;
  //   const y = e.clientY;
  //   e.target.style.left = x + 'px';
  //   e.target.style.top = y + 'px';
  // })
  // dragItems.addEventListener('dragend', e => {
  //   const x = e.clientX - selectArea.offsetLeft;
  //   const y = e.clientY - selectArea.offsetTop;
  //   e.target.style.left = x + 'px';
  //   e.target.style.top = y + 'px';
  //   currentItem = null;
  // })
  
  // dropArea.addEventListener('dragenter', e => {
  //   e.preventDefault();
  // })
  // dropArea.addEventListener('dragover', e => {
  //   e.preventDefault();
  // })
  // dropArea.addEventListener('drop', e => {
  //   e.preventDefault();
  //   if (currentItem !== null) {
  //     currentItem.style.left = e.clientX - selectArea.offsetLeft + 'px';
  //     currentItem.style.top = e.clientY - selectArea.offsetTop + 'px';
  //   }
  // })
  function handleDragStart(e) {

  }
}

export default enableDrag;