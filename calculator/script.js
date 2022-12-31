document.addEventListener('DOMContentLoaded', () => {
  
})

const display = document.querySelector('#display');
let text = '';
let preNum = '0';
let operator = null;
let res = null;
const buttons = document.querySelectorAll('#btn');

buttons.forEach((btn) => {
  btn.addEventListener('click', click)
})

function click(value) {
  let test = value.target.innerText
  if(isNaN(test)) {
    operate(test);
  } else {
    input(test);
  }
  display.innerText = text;
}

function operate(val) {
  switch (val) {
    case 'AC':
      text = '0';
      preNum = '0';
      operator = null;
      break;
    case '←':
      if( text.length != 1 ){
        text = text.substring(0, text.length - 1);
      } else {
        text = '0';
      }
      break;
    case '+':
    case '-':
    case '×':
    case '÷':
    case '%':
      preNum = text;
      operator = val;
      break;
    case '=':
      console.log(preNum + operator + text);
      break;
    default:
      console.log(val);
      break;
  }
}

function input(number) {
  if ( operator != null ) {
    display.innerText = '';
    text = text + number;
  } else if(display.innerText === '0') {
    text = number;
  } else {
    text = text + number;
  }
}