function cellSelectBox(tableEle) {

  let startCell = null;

  let startX = 0;
  let startY = 0;

  const selectBox = document.createElement('div');
  selectBox.classList.add('select-box');

  tableEle.addEventListener('mousedown', mouseDown);

  function mouseDown(e) {
    if (e.target.nodeName === 'TD') {
      startCell = e.target;
    }
    // let cellStyle = startCell.getBoundingClientRect();
    let cellStyle = getComputedStyle(startCell);

    const cellWidth = parseFloat(cellStyle.width, 10);
    const cellHeight = parseFloat(cellStyle.height, 10);

    selectBox.style.height = `${cellHeight}px`;
    selectBox.style.width = `${cellWidth}px`;
    selectBox.style.left = `${e.offsetX}px`;
    selectBox.style.top = `${e.offsetY}px`;

    tableEle.append(selectBox);

    tableEle.addEventListener('mousemove', mouseMove);
    tableEle.addEventListener('mouseup', mouseUp);
  };

  function mouseMove(e) {

  };

  function mouseUp(e) {
    
  };

}

export default cellSelectBox;
