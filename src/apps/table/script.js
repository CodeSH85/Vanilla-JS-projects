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
];

document.addEventListener('DOMContentLoaded', () => {
  renderColumns({ columns: headers });
  displayRows(startIndex, DISPLAY_ROWS);
})

const DISPLAY_ROWS = 30;
let rowHeight = 24;
let startIndex = 0;
let scrollTop = 0;

// DOM
const table = getEle('table');
const tableWrapper = getEle('#tableWrapper');

// header
const headerElement = getEle('#header');
function renderColumns({ columns }) {
  const tr = createEle('tr');
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    const th = createEle('th');
    th.innerHTML = column.title;
    tr.appendChild(th);
  }
  headerElement.appendChild(tr);
}

// body
const tableBody = getEle('#tableBody');

function getContainerHeight() {
  return (table_data.length * rowHeight);
}
console.log(getContainerHeight());
function renderRows({rows, columns}) {
  tableBody.innerHTML = '';
  for (let r = 0; r < rows.length; r++) {
    const tr = createEle('tr');
    tr.style.position = 'absolute';
    tr.style.boxSizing = 'border-box';
    tr.style.transform = `translate(0px, ${(r + startIndex) * rowHeight}px)`;
    tr.style.top = '0px';
    for (let c = 0; c < columns.length; c++) {
      const td = createEle('td');
      td.innerHTML = rows[r][columns[c].key];
      tr.appendChild(td);
    }
    tableBody.appendChild(tr);
  }
  const expender = createEle('div');
  expender.style = `
    position: absolute;
    margin: -2px 0px 0px;
    padding: 0px;
    visibility: hidden;
    font-size: 2px;
    transform: translate(0px, ${getContainerHeight()}px)
  `;
  expender.innerHTML = '&nbsp';
  tableBody.appendChild(expender);
}

// core
tableBody.addEventListener('scroll', handleScroll);
function handleScroll(e) {
  scrollTop = e.target.scrollTop;
  startIndex = Math.floor(scrollTop / rowHeight);
  displayRows(startIndex, startIndex + DISPLAY_ROWS);
};

function displayRows(start, end) {
  const rows = table_data.slice(start, end);
  renderRows({ rows, columns: headers });
}

function Virtualize({
  target,
  item
}) {
  
}
