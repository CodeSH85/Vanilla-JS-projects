// const box = document.createElement('div');

const selectArea = document.querySelector('#selectArea');
for (let i = 0; i < 50; i++) {
  const box = document.createElement('div');
  box.classList.add('box')
  box.id = 'box';
  selectArea.append(box);
}
