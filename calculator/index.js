const numBtnContainer = document.querySelector('#numBtnContainer');
const numbers = []

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
const operators = ['+', '-', '*', '/', '='];

let test = operators.map((operator) => {
  return `<button class="operate-btn btn" id="operateBtn btn"
    value="${operator}">${operator}
    </button>`
});

operateBtnContainer.innerHTML = test.join(' ');

const btn = document.querySelectorAll('.btn');
btn.forEach((btn)=>{
  btn.addEventListener('click', () => {
    console.log(btn.value);
  })
})
