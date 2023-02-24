// const box = document.createElement('div');

const selectArea = document.querySelector('#selectArea');
// for (let i = 0; i < 50; i++) {
//   const box = document.createElement('div');
//   box.classList.add('box')
//   box.id = 'box';
//   selectArea.append(box);
// }
selectArea.addEventListener('mousedown', e => {
  console.log('down');
  let x = e.clientX - e.target.offsetLeft;
  let y = e.clientY - e.target.offsetTop;

  const div = document.createElement('div');
  div.style = `position: absolute; height: 10px; width: 10px; background: red; top: ${y - 5}px; left: ${x - 5}px;`;
  selectArea.appendChild(div);
  const div2 = document.createElement('div');
  div2.style = `position: absolute; height: 0px; width: 0px; background-color: rgba(123, 123, 123, 0.5); top: ${y - 5}px; left: ${x - 5}px;`;
  selectArea.appendChild(div2);

  function handleMouseMove(e) {
    let curX = e.offsetX;
    let curY = e.offsetY;
    if (curX < x) {
      curX = x - curX;
      div2.style.left = `${x - curX}px`
    }
    if (curY < y) {
      curY = y - curY;
      div2.style.top = `${y - curY}px`
    }
    console.log('X: ' + curX);
    console.log('Y: ' + curY);
    div2.style.width = curX + 'px';
    div2.style.height = curY + 'px';
  }

  selectArea.addEventListener('mousemove', handleMouseMove);
  
  selectArea.addEventListener('mouseup', e => {
    const div = document.createElement('div');
    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;
    div.style = `position: absolute; height: 10px; width: 10px; background: blue; top: ${y - 5}px; left: ${x - 5}px;`;
    selectArea.appendChild(div);
    selectArea.removeEventListener('mousemove');
    selectArea.removeChild(div2);
    // console.log('up');
  })
})

