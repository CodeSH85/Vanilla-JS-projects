const dragSource = document.querySelectorAll('#dragSource');
const dragSource2 = document.querySelector('#dragSource2');

dragSource.forEach(element => {
  element.addEventListener('dragstart', dragStart);
})
// dragSource2.forEach(element => {
//   element.addEventListener('dragstart', dragStart_2);
// })

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);
  console.log('drag!');
}
// function dragStart_2(e) {
//   e.dataTransfer.setData('text/plain', e.target.id);
//   console.log(e.target);
//   e.target.style.backgroundColor = 'blue';
//   e.target.innerHTML = 'dragging!!!'
//   console.log('dragging');
// }

const eventHandler = {
  handlers: {
    dragstart(e){
      e.dataTransfer.setData('text/plain', e.target.id);
      e.target.style.backgroundColor = 'blue';
      e.target.innerHTML = 'dragging!!!'
      console.log('dragging!');
    },
    dragend(e){
      e.target.style.backgroundColor = '#7777ff';
      e.target.innerHTML = '';
      console.log('release!!');
    },
    default(e){
      console.log('unhandled event');
    }
  },
  handleEvent(evt) {
    switch (evt.type) {
      case "dragstart":
        this.handlers.dragstart~(evt);
        break;
      case "dragend":
        this.handlers.dragend(evt);
        break;
      default:
        this.handlers.default(evt);
    }
  }
}

console.log(Object.keys(eventHandler.handlers))

Object.keys(eventHandler.handlers).forEach( eventName => {
  dragSource2.addEventListener(eventName, eventHandler)
})


const placeArea = document.querySelector('#place');

placeArea.addEventListener('drop', dropped);
placeArea.addEventListener('dragenter', cancelDefault);
placeArea.addEventListener('dragover', cancelDefault);

function dropped(e) {
  console.log('dropped');
  cancelDefault(e);
  let id = e.dataTransfer.getData('text/plain');
  e.target.appendChild(document.querySelector(`#${id}`));
}

function cancelDefault(e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}
