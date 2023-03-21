function cellSelectBox(tableEle) {

  let startCell = null;

  let startX = 0;
  let startY = 0;

  const selectBox = document.createElement('div');
  selectBox.classList.add('select-box');

  tableEle.addEventListener('mousedown', mouseDown);

  function mouseDown(e) {
    console.log(e.target.nodeName);
    if (e.target.nodeName === 'TD') {
      startCell = e.target;
    }
    let startCellStyle = startCell.getBoundingClientRect();
    console.log(startCellStyle);

    selectBox.style.height = `${startCellStyle.height}px`;
    selectBox.style.width = `${startCellStyle.width}px`;
    selectBox.style.left = `${startCellStyle.x}px`;
    selectBox.style.top = `${startCellStyle.y}px`;

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
