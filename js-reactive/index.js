'use strict';

const ReactiveNode = (div, value) => {

  return new Proxy( { value: '' }, {

    get: (target, prop) => {
      return target[prop];
    },
    set: (target, prop, value, self) => {
      
      target[prop] = value;

      document.querySelectorAll(div).forEach(item => {
        let el = document.createElement('div');
        el.innerHTML = value;
        item.innerText = el.innerHTML
      });

      return true;
    },
  })
}

const textDisplay = '#textDisplay';
const textInput = document.querySelector('#textInput');

textInput.addEventListener('input', accessProxy)

function accessProxy(e) {
  ReactiveNode(textDisplay).value = e.target.value
}
