let total;

let buttons = document.querySelectorAll('button');
const deno = document.querySelector('#deno');
const num = document.querySelector('#num');
const boxes = document.querySelectorAll('#box');
let nextSibling = buttons.nextElementSibling;

boxes.forEach(box => {
  box.childNodes.forEach(node => {
    // console.log(node);
    if(node.dataset) {
      console.log(node);
    }
    if(node.tagName === 'BUTTON') {
      node.addEventListener('click', (e) => {
        console.log(e.target);
      })
    }
  })
});

let getSibling = function(e) {
  let siblings = [];
  if(!e.parentNode) {
    return siblings;
  }
  let sibling = e.parentNode.firstChild;

  while(sibling) {
    if(sibling.nodeType === 1 && sibling !== e) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
}
