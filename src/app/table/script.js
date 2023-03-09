import table_data from './data.json' assert {type: "json"};

const header = document.querySelector('#header');
const tableBody = document.querySelector('#tableBody');

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

header.innerHTML = headerTemplate;
tableBody.appendChild(rowsFragment);