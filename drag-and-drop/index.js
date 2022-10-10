const dragSource = document.querySelectorAll('#dragSource')
dragSource.forEach(element => {
  element.addEventListener('dragStart', dragStart)
});
function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);
  console.log('drag!')
}

const placeArea = document.querySelector('#place')

placeArea.addEventListener('drop', dropped)
placeArea.addEventListener('dragenter', cancelDefault)
placeArea.addEventListener('dragover', cancelDefault)

function dropped(e) {
  console.log('dropped')
  cancelDefault(e);
  let id = e.dataTransfer.getData('text/plain');
  e.target.appendChild(document.querySelector('#' + id));
}

function cancelDefault(e) {
  e.preventDefault()
  e.stopPropagation()
  return false
}

