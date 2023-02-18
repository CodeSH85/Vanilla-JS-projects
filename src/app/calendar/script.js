const ROWS_COUNT = 5;
const COLUMNS_COUNT = 7;

const calenderContainer = document.querySelector('#calenderContainer');
const bodyContainer = document.createElement('div');
bodyContainer.style = 'width: 100%;';
calenderContainer.appendChild(bodyContainer);

for (let i = 0; i < ROWS_COUNT; i++) {
  const rowContainer = document.createElement('div');
  rowContainer.style = `height: 50px; width: 100%; border: 1px solid red; display: flex;`;
  bodyContainer.append(rowContainer);
  for (let n = 0; n < COLUMNS_COUNT; n++) {
    const cell = document.createElement('div');
    cell.innerHTML = `${n}`;
    // bodyContainer.childNodes[n].appendChild(cell);
    rowContainer.appendChild(cell);
  }
}
