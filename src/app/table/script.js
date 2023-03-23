import table_data from './data.json' assert {type: "json"};
import cellSelectBox from './selection.js'

const HEADER_HEIGHT = 24;
let START_INDEX = 0;
const ROW_HEIGHT = 24;
const DISPLAY_ROWS = 25;
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

const rowsFragment = document.createDocumentFragment();

table_data.forEach((data) => {
  const rowElement = document.createElement('tr');
  rowElement.innerHTML = `
    <td>${data.id}</td>
    <td>${data.first_name}</td>
    <td>${data.last_name}</td>
    <td>${data.email}</td>
    <td>${data.job_title}</td>
  `;
  rowsFragment.appendChild(rowElement);
});

function displayData() {
  let res = table_data.slice(START_INDEX, START_INDEX + DISPLAY_ROWS);
  return res;
}
console.log(displayData());


header.innerHTML = headerTemplate;
tableBody.appendChild(rowsFragment);

const tableWrapper = document.querySelector('#tableWrapper')
tableWrapper.addEventListener('scroll', handleScroll);

function handleScroll(e) {
  console.log(e);
};
