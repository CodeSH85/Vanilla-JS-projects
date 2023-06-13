import table_data from './data.json' assert {type: "json"};
import cellSelectBox from './selection.js';

const HEADER_HEIGHT = 24.5;
let START_INDEX = 0;
const ROW_HEIGHT = 25;
const DISPLAY_ROWS = 30;
const BUFFER_ROWS = 20;

const header = document.querySelector('#header');
const tableBody = document.querySelector('#tableBody');
const tableWrapper = document.querySelector('#tableWrapper');
const scrollExpander = document.querySelector('#scrollExpander');
const table = document.querySelector('table');
const section = document.querySelector('section');

document.addEventListener('DOMContentLoaded', e => {
  renderRows(START_INDEX, DISPLAY_ROWS);
  // cellSelectBox(tableBody);
})

// header
const headerTemplate = `
  <tr>
    <th>ID</th> 
    <th>First Name</th>
    <th>Last Name</th>
    <th>Email</th>
    <th>gender</th>
  </tr>
`;
header.innerHTML = headerTemplate;

function displayData(start, count) {
  const cache = {};
  return table_data.slice(start, start + count);
}

function renderRows(start, count) {
  const rowsFragment = document.createDocumentFragment();
  displayData(start, count).forEach((row, i) => {
    const rowElement = document.createElement('tr');
    rowElement.innerHTML = `
      <td>${row.id}</td>
      <td>${row.first_name}</td>
      <td>${row.last_name}</td>
      <td>${row.email}</td>
      <td>${row.gender}</td>
    `;

    if (row.id % 2 === 0) {
      rowElement.classList.add('is-even-row');
    } else {
      rowElement.classList.add('is-odd-row');
    }

    rowsFragment.appendChild(rowElement);
  })
  tableBody.innerHTML = '';
  tableBody.appendChild(rowsFragment);
}

tableWrapper.addEventListener('scroll', handleScroll);
scrollExpander.style.height = `${table_data.length * ROW_HEIGHT}px`;

let scrollTime = false;
let throttleTimeout;

function handleScroll(e) {
  if (scrollTime) return;
  throttleTimeout = setTimeout(() => {
    scrollTime = true;
    clearTimeout(throttleTimeout);

    const { scrollTop, clientHeight, scrollHeight } = e.target;

    let startNode = Math.floor(scrollTop / ROW_HEIGHT) - BUFFER_ROWS;
    let endNode = Math.floor((scrollTop + clientHeight) / ROW_HEIGHT) + BUFFER_ROWS;
    startNode = Math.max(0, startNode);
    endNode = Math.min(endNode, table_data.length);

    let offsetY = `${ startNode * ROW_HEIGHT + HEADER_HEIGHT }px`;
    requestAnimationFrame(() => {
      section.style.transform = `translate3d(0, ${offsetY}, 0)`;
      renderRows(startNode, endNode - startNode);
      scrollTime = false;
    })
  }, 150);
};
