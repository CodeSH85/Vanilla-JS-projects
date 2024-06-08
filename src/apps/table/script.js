
import table_data from './data.json' with {type: "json"};
import { debounce } from '../../utils/helpers.js';
import { getEle, createEle } from '../../utils/dom.js';

const headers = [
  {
    key: 'id',
    title: 'ID'
  },
  {
    key: 'first_name',
    title: 'First Name'
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

const count = 10000;
const data = buildData(table_data, 10);

function buildData(target, count) {
  let res = [];
  for (let i = 0; i < count; i++) {
    res = res.concat(target);
  }
  return res;
}

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
  return data.length * rowHeight;
}
function createExpender() {
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
function renderRows({rows, columns}) {
  tableBody.innerHTML = '';
  const fragment = document.createDocumentFragment();
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
    fragment.appendChild(tr);  
  }
  // tableBody.appendChild(tr);
  tableBody.appendChild(fragment);
  createExpender();
}

// core
tableBody.addEventListener('scroll', handleScroll);
function handleScroll(e) {
  scrollTop = e.target.scrollTop;
  startIndex = Math.floor(scrollTop / rowHeight);
  displayRows(startIndex, startIndex + DISPLAY_ROWS);
};

function displayRows(start, end) {
  const rows = data.slice(start, end);
  renderRows({ rows, columns: headers });
}


function Virtualize({ container, items }) {
  const containerEle = null;
  // if (!container) containerEle = 
  const { height: containerHeight } = container.getBoundingClientRect();
  return;
}
