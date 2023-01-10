let total;

let buttons = document.querySelectorAll('button');
const deno = document.querySelector('#deno');
const num = document.querySelector('#num');
const box2 = document.querySelector('#box2');

buttons.forEach(btn => {
  btn.onclick = function() {
    console.log(this.parentElement);
    total ++;
    if( btn.dataset.edit === 'plus' ) {
      num.dataset.value ++;
      deno.dataset.value ++;
    } else {
      num.dataset.value --;
      deno.dataset.value --;
    }
    num.textContent = num.dataset.value;
    deno.textContent = deno.dataset.value;
    box2.style = `
      flex-grow: ${num.dataset.value}
    `;
  }
});


