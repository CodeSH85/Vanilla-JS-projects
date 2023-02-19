const ROWS_COUNT = 5;
const COLUMNS_COUNT = 7;

const calenderContainer = document.querySelector('#calenderContainer');
const headerContainer = document.createElement('div');
const bodyContainer = document.createElement('div');
bodyContainer.classList.add('body-container');
calenderContainer.appendChild(headerContainer);
headerContainer.classList.add('header-container');
calenderContainer.appendChild(bodyContainer);

const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

for (let n = 0; n < COLUMNS_COUNT; n++) {
  const headerCell = document.createElement('div');
  headerCell.classList.add('header');
  headerContainer.appendChild(headerCell);
  headerCell.innerHTML = `<span>${dayList[n]}</span>`;
}

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth()+1;

function getMonthDays(year, month) {
  const date = new Date(year, month, 0);
  return date.getDate();
}

let dateBuffer = getMonthDays(year, month);
let dayCounter = 1;
let start = new Date(year, month, 1).getDay();

for (let row = 0; row < ROWS_COUNT; row++) {
  const rowContainer = document.createElement('div');
  rowContainer.classList.add('row-container');
  bodyContainer.append(rowContainer);
  for (let col = 0; col < COLUMNS_COUNT; col++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    if (row === 0 && col < start) {
      cell.innerHTML = ``;
    } else if (dayCounter <= dateBuffer) {
      cell.innerHTML = `${dayCounter}`;
      dayCounter++;
    } else {
      cell.innerHTML = ``;
    }
    rowContainer.appendChild(cell);
  }
}

console.log(getMonthDays(year, month));
