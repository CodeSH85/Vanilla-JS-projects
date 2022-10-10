
const hex = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f' ];

document.addEventListener('DOMContentLoaded', ()=>{
  generateRandomColor();
  options();
})

function generateRandomColor() {

  let color = '#';

  let colorSets = [];
  
  for(let i = 0; i < 3; i++){
    for(let x = 0; x < 6; x++){
      color += hex[getRandomNum(hex)];
    }
    colorSets.push(color);
    color = '#';
  }
  
  const picked = getRandomNum(colorSets)

  console.log(picked);
  console.log(colorSets[picked]);

  const colorBox = document.querySelector('#colorBox');
  const btnContainer = document.querySelector('#btnContainer');
  colorBox.style.backgroundColor = colorSets[picked];

  const button = colorSets.map( color =>{
    return `<button id="btn" value="${color}">${color}</button>`;
  });
  const buttonList = button.join(' ')
  btnContainer.innerHTML = buttonList;

}

function options () {
  const rgbToHex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
  const result = rgbToHex(colorBox.style.backgroundColor)
  const msg = document.querySelector('#msg')
  document.addEventListener('click', (e)=>{
    if(e.target.id === 'btn') {
      if(result !== e.target.value){
        msg.textContent = `Wrong!`
      } else {
        msg.textContent = `Correct!`
        setTimeout(() => {
          correctAns();
        }, 1000);
      }
    }
  }) 
}

function correctAns() {
  msg.innerHTML = '&nbsp';
  generateRandomColor();
  options();
}

function getRandomNum(arr) {
  return Math.floor(Math.random() * arr.length);
}
