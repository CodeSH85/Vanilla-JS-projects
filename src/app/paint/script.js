const canvas = document.querySelector('#canvas');
paintCanvas();
function paintCanvas() {
  if (canvas.getContext) {
    let ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(200, 100);
    ctx.closePath();
    ctx.stroke();
  } else {
    
  };
};

canvas.addEventListener('mousedown', e => {
  console.log(e);
  const div = document.createElement('div');
  div.style.backgroundColor = 'red';
  div.style.position = 'absolute';

  div.style.width = 20 + 'px';
  div.style.height = 20 + 'px';

  div.style.top = e.clientY + 'px';
  div.style.left = e.clientX + 'px';
  canvas.appendChild(div);
  console.log(div.style.position);
});
