import mock_data from './data.json' assert {type: "json"};

const ROWS_COUNT = 5;
// 7 = 7 days a week
const COLUMNS_COUNT = 7;

document.addEventListener('DOMContentLoaded', () => {
  renderCalender();
})

const calenderContainer = document.querySelector('#calenderContainer');
const headerContainer = document.createElement('div');
const bodyContainer = document.createElement('div');
headerContainer.classList.add('header-container');
bodyContainer.classList.add('body-container');
calenderContainer.appendChild(headerContainer);
calenderContainer.appendChild(bodyContainer);


const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth()+1;
let year = date.getFullYear();
let month = date.getMonth()+1;
let today = date.getDate();

function renderCalender() {
  const yearInfo = document.querySelector('#yearInfo');
  const monthInfo = document.querySelector('#monthInfo');

  function getMonthDates(year, month) {
    const date = new Date(year, month, 0);
    return date.getDate();
  }

  let monthTotalDays = getMonthDates(year, month);

  headerContainer.innerHTML = ``;
  bodyContainer.innerHTML = ``;
  yearInfo.textContent = year;
  monthInfo.textContent = month;

  // 1 = 1st date, start of each month
  let dayCounter = 1;

  // get the month's starting day, e,g: sunday...
  let startAtDay = new Date(year, month - 1, 1).getDay();

  let rowsCount = Math.ceil((monthTotalDays + startAtDay) / COLUMNS_COUNT);

  // render header
  for (let n = 0; n < COLUMNS_COUNT; n++) {
    const headerCell = document.createElement('div');
    headerCell.classList.add('header');
    headerContainer.appendChild(headerCell);
    headerCell.innerHTML = `<span>${dayList[n]}</span>`;
  }

  // render row cells
  for (let row = 0; row < rowsCount; row++) {
    const rowContainer = document.createElement('div');
    rowContainer.classList.add('row-container');
    bodyContainer.append(rowContainer);
    for (let col = 0; col < COLUMNS_COUNT; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      mock_data.forEach(data => {
        const dataYear = parseInt(data.date.slice(0, 4));
        const dataMonth = parseInt(data.date.slice(5, 7));
        // TODO: parseInt turn date "01" to 1, cause rendering issue.
        const dataDate = parseInt(data.date.slice(8, 10));
        if ( dataDate === dayCounter && dataMonth === month && dataYear === year ) {
          cell.style.backgroundColor = '#a1a1a1';
          cell.addEventListener('click', (e)=>{
            showDateDetail(e, data)
          });
        }
      })
      // set cell's text content
      if (row === 0 && col < startAtDay) {
        // cells before start day of the month should be null.
        cell.classList.add('cell-empty');
      } else if (dayCounter <= monthTotalDays) {
        cell.innerHTML = `<span>${ dayCounter }</span>`;
        // today's cell.
        if (dayCounter === today && month === currentMonth && year === currentYear) {
          cell.classList.add('cell-current-day');
        }
        dayCounter++;
      } else {
        // cells after last day of the month should be null.
        cell.classList.add('cell-empty');
      }
      rowContainer.appendChild(cell);
    }
  }
}

function showDateDetail(e, dateData) {
  alert(dateData.title);
}

const prevBtn = document.querySelector('#prevMonth');
const nextBtn = document.querySelector('#nextMonth');

prevBtn.addEventListener('click', () => {
  month--;
  if (month < 1) {
    month = 12;
    year--;
  } else if (month > 12) {
    month = 1;
    year++;
  }
  renderCalender();
})

nextBtn.addEventListener('click', () => {
  month++;
  if (month < 1) {
    month = 12;
    year--;
  } else if (month > 12) {
    month = 1;
    year++;
  }
  renderCalender();
})
