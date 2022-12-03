
document.addEventListener('DOMContentLoaded', ()=>{
  // renderBtn();
})
renderBtn();
function renderBtn() {
  const numBtnContainer = document.querySelector('#numBtnContainer');
  const numbers = []
  const display = document.querySelector('#display');

  for( let i = 0; i < 10; i++ ) {
    numbers.push(i)
  }

  let numDisplay = numbers.map((num) => {
    return `<button class="num-btn btn" id="numBtn btn"
    value="${num}">${num}
    </button>`;
  })

  numBtnContainer.innerHTML = numDisplay.join(' ');

  const operateBtnContainer = document.querySelector('#operateBtnContainer')
  const operators = ['+', '-', '*', '/', '.', '='];

  let operateBtn = operators.map((operator) => {
    return `<button class="operate-btn btn" id="operateBtn btn"
      value="${operator}">${operator}
      </button>`
  });

  operateBtnContainer.innerHTML = operateBtn.join(' ');
}


// store the value
let input = [];

// num
const btn = document.querySelectorAll('.btn');
btn.forEach((btn)=>{
  btn.addEventListener('click', (e) => {
    input.push(btn.value);
    console.log(input);
    display.textContent = input;

    // proxyDisplay.textContent = input;
    if(btn.value == '='){
      calculate(display.textContent);
    }
  })
})


// AC
const allClear = document.querySelector('#acBtn');
allClear.addEventListener('click', ()=>{
  input = [];
  console.log(input);
  // proxyDisplay.textContent = input;
  display.textContent = input;
})

// del
const del = document.querySelector('#delBtn');
del.addEventListener('click', ()=>{
  input.pop();
  console.log(input);
  display.textContent = input;
  // proxyDisplay.textContent = input;
})

// display.style.backgroundColor = 'red';

// const proxyDisplay = new Proxy(display, {
//   set: function(target, key, value) {
//     // console.log(`${target}'s ${key} set to ${value}`);
//     target[key] = value;
//     return true;
//   },
//   get: function(target, value) {
//     console.log(target, value);
//   }
// });

function calculate(value) {
  console.log(parseInt(value));
}

const test = document.querySelector('.test');
// console.log(test.dataset.test);

console.log(1+1)
display.textContent = 1+1;
