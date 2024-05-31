import table_data from './data.json' with {type: "json"};
import { getEle, debounce, createEle } from '../../utils/helpers.js';

const headers = [
  {
    key: 'id',
    title: 'ID'
  },
  {
    key: 'last_name',
    title: 'Last Name'
  },
  {
    key: 'email',
    title: 'Email'
  }
]

document.addEventListener('DOMContentLoaded', () => {
  renderColumns({columns: headers});
  renderRows({ rows: table_data, columns: headers});
})

const HEADER_HEIGHT = 24.5;
let START_INDEX = 0;

const ROW_HEIGHT = 25;
const DISPLAY_ROWS = 30;
const BUFFER_ROWS = 15;

let scrollTop = 0;

// DOM
const tableWrapper = getEle('#tableWrapper');
const tr = createEle('tr');

// header
const headerElement = getEle('#header');
headerElement.appendChild(tr);
function renderColumns({ columns }) {
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    const th = createEle('th');
    th.innerHTML = column.title;
    headerElement.appendChild(th);
  }
}

// body
const tableBody = getEle('#tableBody');
function renderRows({rows, columns}) {
  for (let r = 0; r < rows.length; r++) {
    const tr = createEle('tr');
    for (let c = 0; c < columns.length; c++) {
      const td = createEle('td');
      td.innerHTML = rows[r][columns[c].key];
      tr.appendChild(td);
    }
    tableBody.appendChild(tr);
  }
}

function displayData(start, count) {
  return table_data.slice(start, start + count);
}

const displayRowCounts = () => {
}

function calcRowHeight() {
  let height = '';
  return height;
}

function getScrollExpanderHeight() {
  return table_data.length * ROW_HEIGHT;
}

tableWrapper.addEventListener('scroll', handleScroll);

let scrollTime = false;
let throttleTimeout;

function handleScroll(e) {
};
