const ROWS_COUNT = 5;
const COLUMNS_COUNT = 7;

document.addEventListener('DOMContentLoaded', () => {
  renderCalender();
  console.log(month);
})

const calenderContainer = document.querySelector('#calenderContainer');
const headerContainer = document.createElement('div');
const bodyContainer = document.createElement('div');
bodyContainer.classList.add('body-container');
calenderContainer.appendChild(headerContainer);
headerContainer.classList.add('header-container');
calenderContainer.appendChild(bodyContainer);

const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const date = new Date();
let year = date.getFullYear();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth()+1;
let month = date.getMonth()+1;
let today = date.getDate();

console.log(today);

function renderCalender() {

  const yearInfo = document.querySelector('#yearInfo');
  const monthInfo = document.querySelector('#monthInfo');

  function getMonthDays(year, month) {
    const date = new Date(year, month, 0);
    return date.getDate();
  }

  let monthTotalDays = getMonthDays(year, month);
  headerContainer.innerHTML = ``;
  bodyContainer.innerHTML = ``;
  let dayCounter = 1;
  let startAtDay = new Date(year, month - 1, 1).getDay();
  yearInfo.textContent = year;
  monthInfo.textContent = month;

  let rowsCount = Math.ceil((monthTotalDays + startAtDay) / COLUMNS_COUNT);

  for (let n = 0; n < COLUMNS_COUNT; n++) {
    const headerCell = document.createElement('div');
    headerCell.classList.add('header');
    headerContainer.appendChild(headerCell);
    headerCell.innerHTML = `<span>${dayList[n]}</span>`;
  }

  for (let row = 0; row < rowsCount; row++) {
    const rowContainer = document.createElement('div');
    rowContainer.classList.add('row-container');
    bodyContainer.append(rowContainer);
    for (let col = 0; col < COLUMNS_COUNT; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (row === 0 && col < startAtDay) {
        cell.innerHTML = ``;
      } else if (dayCounter <= monthTotalDays) {
        cell.innerHTML = `${dayCounter}`;
        if(dayCounter === today && month === currentMonth && year === currentYear) {
          cell.style.color = 'red';
        }
        dayCounter++;
      } else {
        cell.innerHTML = ``;
      }
      rowContainer.appendChild(cell);
    }
  }
}

const prevBtn = document.querySelector('#prevMonth');
const nextBtn = document.querySelector('#nextMonth');

prevBtn.addEventListener('click', () => {
  month--;
  if (month < 1) {
    month = 12;
    year--;
  } else if (month>12) {
    month = 1;
    year++;
  }
  console.log(month);
  renderCalender();
})

nextBtn.addEventListener('click', () => {
  month++;
  if (month < 1) {
    month = 12;
    year--;
  } else if (month>12) {
    month = 1;
    year++;
  }
  console.log(month);
  renderCalender();
})
