const canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d'),
    canvasLeft,
    canvasRight

canvas.addEventListener('mousedown', handleDraw);
canvas.addEventListener('mouseup', handleUp);

function handleDraw (event) {
  console.log(event);

  ctx.beginPath();
  ctx.moveTo(event.clientX, event.clientY);
}
function handleUp(event) {

  ctx.lineTo(event.clientX, event.clientY);
  ctx.strokeStyle = "red";
  ctx.stroke();
}
