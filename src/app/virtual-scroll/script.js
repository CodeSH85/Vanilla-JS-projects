const tableData = Array.from({length: 200}).map((item, index) => ({
  id: index,
  name: `Saul Goodman`,
  gender: 'Male',
  age: 50,
  job: 'lawyer',
}));

const HEADER_HEIGHT = 24;
const START_INDEX = 0;
const END_INDEX = 0;
const ROW_HEIGHT = 30;
const DISPLAY_ROWS = 25;
const CONTAINER_HEIGHT = ROW_HEIGHT * 15;

function displayData() {
  let res = tableData.slice(START_INDEX, START_INDEX + DISPLAY_ROWS);
  return res;
}

const test = document.querySelector('#test');
test.innerHTML = displayData().map((item, i) => {
  return`
  <li class="row">No.${item.id}<span> ${item.name}</span><span>${item.gender}</span></li>
  `;
}).join(' ');

test.style.height = `${tableData.length * ROW_HEIGHT}px`;

console.log(displayData());

const tableContainer = document.querySelector('#tableContainer');
tableContainer.style.height = `${CONTAINER_HEIGHT}px`;

tableContainer.addEventListener('scroll', e => {
  console.log(e.target.scrollTop);
})

function updateTable(startIndex) {
  const visibleData = tableData.slice(startIndex, DISPLAY_ROWS);

}

