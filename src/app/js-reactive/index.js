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

function accessProxy(e) {
  ReactiveNode(textDisplay).value = e.target.value;
}

const textDisplay = '#textDisplay';
const loop = '#loop';
const textInput = document.querySelector('#textInput');

textInput.addEventListener('input', accessProxy);

const LoopDisplay = (div, data) => {
  return new Proxy({ value: data }, {
    get: (target, prop) => {
      return target[prop];
    },
    set: (target, prop, value) => {
      let DOM = document.querySelector(div);
      target[prop].forEach( item => {
        let el = document.createElement('div');
        el.innerHTML = Object.values(item);
        DOM.innerText = el.innerHTML; 
      });
      return true; 
    }
  })
}

LoopDisplay(loop, [{name: 'Saul', age: 20, job: 'lawyer'}]).value = [{name: 'Mike'}]

const btn = document.querySelector('#btn');

btn.addEventListener('click', debounce(function(e) {
  console.log(e.target)
}, 2000));

function debounce(func, delay) {
  let timeout = null;

  return function() {
    let context = this;
    let args = arguments;
    clearTimeout(timeout)

    timeout = setTimeout(function(){
      func.apply(context, args)
    }, delay)
  }
};

function throttle(func, delay){
  let inThrottle;
  let timeout = null;
  return function(){
    let context = this;
    let args = arguments;
    if(!inThrottle){
      // 輸入之後兩秒內都不回進入這邊
      func.apply(context, args)
      inThrottle = true;
      clearTimeout(timeout);
      timeout = setTimeout(function(){
        inThrottle = false
      }, delay)
    }
  }
}
throttle(function(e){
        console.log(e.target.value);
}, 2000)