import table_data from './data.json' assert {type: "json"};
import cellSelectBox from './selection.js'

const HEADER_HEIGHT = 24.5;
let START_INDEX = 0;
const ROW_HEIGHT = 25;
const DISPLAY_ROWS = 30;
const CONTAINER_HEIGHT = ROW_HEIGHT * 15;

const header = document.querySelector('#header');
const tableBody = document.querySelector('#tableBody');
cellSelectBox(tableBody);

const headerTemplate = `
  <tr>
    <th>ID</th>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Email</th>
    <th>Job Title</th>
  </tr>
`;

function displayData(start, count) {
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
      <td>${row.job_title}</td>
    `;
    rowsFragment.appendChild(rowElement);
  })
  tableBody.innerHTML = '';
  tableBody.appendChild(rowsFragment);
}

header.innerHTML = headerTemplate;
renderRows(START_INDEX, DISPLAY_ROWS);

const tableWrapper = document.querySelector('#tableWrapper');
const container = document.querySelector('#container');
const table = document.querySelector('table');
const section = document.querySelector('section');

tableWrapper.addEventListener('scroll', handleScroll);
table.style.height = `${displayData(START_INDEX, DISPLAY_ROWS).length * ROW_HEIGHT}px`;
container.style.height = `${table_data.length * ROW_HEIGHT}px`;

function handleScroll(e) {
  const { scrollTop } = e.target;
  let startNode = Math.floor(scrollTop / ROW_HEIGHT);
  
  START_INDEX = startNode;
  section.style.top = `${startNode * ROW_HEIGHT + HEADER_HEIGHT}px`
  renderRows(startNode, DISPLAY_ROWS);
};

