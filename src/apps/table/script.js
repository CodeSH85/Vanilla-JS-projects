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
  calcContainerHeight();
  renderColumns({ columns: headers });
  displayRows(startIndex, DISPLAY_ROWS);
  // renderRows({ rows: table_data, columns: headers});
})

const ROW_HEIGHT = 40;
const DISPLAY_ROWS = 30;
let startIndex = 0;
let scrollTop = 0;

// DOM
const table = getEle('table');
const tableWrapper = getEle('#tableWrapper');

// header
const headerElement = getEle('#header');
function renderColumns({ columns }) {
  const tr = createEle('tr');
  headerElement.appendChild(tr);
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    const th = createEle('th');
    th.innerHTML = column.title;
    headerElement.appendChild(th);
  }
}

// body
const tableBody = getEle('#tableBody');

function calcContainerHeight() {
  table.style.height = (table_data.length * ROW_HEIGHT) + 'px';
}

function renderRows({rows, columns}) {
  tableBody.innerHTML = '';
  for (let r = 0; r < rows.length; r++) {
    const tr = createEle('tr');
    tr.style.transform = `translate(0px, ${(r + startIndex) * ROW_HEIGHT}px)`;
    tr.style.top = '0px';
    for (let c = 0; c < columns.length; c++) {
      const td = createEle('td');
      td.innerHTML = rows[r][columns[c].key];
      tr.appendChild(td);
    }
    tableBody.appendChild(tr);
  }
  const sizer = createEle('div');
  sizer.style.position = 'absolute';
  sizer.style.visibility = 'hidden';
  sizer.style.transform = `translate(0px, ${table_data.length * ROW_HEIGHT}px)`;
  // tableBody.appendChild(sizer);
}

// core
function displayRows(start, end) {
  const rows = table_data.slice(start, end);
  renderRows({ rows, columns: headers });
}

tableWrapper.addEventListener('scroll', handleScroll);
function handleScroll(e) {
  scrollTop = e.target.scrollTop;
  startIndex = Math.floor(scrollTop / ROW_HEIGHT);
  displayRows(startIndex, startIndex + DISPLAY_ROWS);
};

