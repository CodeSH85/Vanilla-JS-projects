const canvas = document.querySelector('#canvas');
canvas.addEventListener('mousedown', e => {
  console.log(e);
  const div = document.createElement('div');
  div.style.backgroundColor = 'red';
  div.style.position = 'absolute';

  div.style.width = 20 + 'px';
  div.style.height = 20 + 'px';

  // div.clientLeft = e.screenX;
  // div.clientTop = e.screenY;
  div.style.top = e.clientY + 'px';
  div.style.left = e.clientX + 'px';
  canvas.appendChild(div);
  console.log(div.style.position);
});
