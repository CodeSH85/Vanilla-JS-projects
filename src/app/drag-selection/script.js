const selectArea = document.querySelector('#selectArea');
const test = document.querySelector('#target');

selectArea.addEventListener('mousedown', e => {
  let startX = e.clientX - e.target.offsetLeft;
  let startY = e.clientY - e.target.offsetTop;
  const start = document.createElement('div');
  start.id = 'start';
  start.style = `position: absolute; height: 10px; width: 10px; background: red; top: ${startY - 5}px; left: ${startX - 5}px;`;
  // selectArea.appendChild(start);
  const div2 = document.createElement('div');
  div2.style =
    `position: absolute; height: 0px; width: 0px; z-index: 999; pointer-events: none;
      background-color: rgba(123, 123, 123, 0.5); top: ${startY}px; left: ${startX}px;
    `;
  selectArea.appendChild(div2);

  selectArea.addEventListener('mousemove', handleMouseMove);

  function handleMouseMove(e) {
    let curX = e.clientX - selectArea.offsetLeft - startX;
    let curY = e.clientY - selectArea.offsetTop - startY;
    if (curX < 0) {
      div2.style.left = `${startX + curX}px`
      div2.style.width = `${-curX}px`
    } else {
      div2.style.left = `${startX}px`
      div2.style.width = `${curX}px`
    }
    if (curY < 0) {
      div2.style.top = `${startY + curY}px`
      div2.style.height = `${-curY}px`
    } else {
      div2.style.top = `${startY}px`
      div2.style.height = `${curY}px`
    }
    div2.style.width = curX + 'px';
    div2.style.height = curY + 'px';
  }

  selectArea.addEventListener('mouseup', e => {

    if(e.target.id === 'start') {
      return;
    }

    function isInRange(area, target) {
      let selectionArea = area.getBoundingClientRect();
      let targetElement = target.getBoundingClientRect();
  
      return ((
        selectionArea.left <= targetElement.left &&
        selectionArea.right >= targetElement.right &&
        selectionArea.top <= targetElement.top &&
        selectionArea.bottom >= targetElement.bottom
      ));
    }

    if (isInRange(div2, test)) {
      test.textContent = 'Selected'
      test.classList.add('selected');
    } else {
      test.textContent = 'Unselected'
      test.classList.remove('selected');
    }

    const end = document.createElement('div');
    let endX = e.clientX - e.target.offsetLeft;
    let endY = e.clientY - e.target.offsetTop;
    end.style = `
      position: absolute; height: 10px; width: 10px;
      background: blue; top: ${endY - 5}px; left: ${endX - 5}px;
    `;
    // selectArea.appendChild(end);
    if (selectArea.contains(div2)) {
      selectArea.removeChild(div2);
    }
  })
})

