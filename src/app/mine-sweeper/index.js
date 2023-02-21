const BOARD_SIZE = 10;
let NUMBER_OF_MINES = 2;

// const board = createBoard(10, 10, 10);
const board = document.querySelector('#board');


// Fisher-Yates
function getRandomNumbers(num) {
  const numbers = Array.from({ length: num }, (_, i) => i + 1); // create an array of numbers from 1 to num
  for (let i = num - 1; i > 0; i--) { // shuffle the array
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers;
}

function createBoard(cols, rows, mines) {
  if (mines >= cols * rows) {
    throw new Error('mines out number the cells!');
  }
  let total = cols * rows;
  let counter = 0;
  let minesArr = [];
  while (minesArr.length < mines) {
    let res = Math.floor(Math.random() * total);
    if (!minesArr.includes(res)) {
      minesArr.push(res);
    }
  }
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const cell = document.createElement('div');
      cell.id = 'cell';
      if (minesArr.includes(counter)) {
        cell.classList.add('mine');
      }
      cell.classList.add('cell');
      board.appendChild(cell);
      counter++;
    }
  }
}

createBoard(10, 10, 10);

const cellArr = document.querySelectorAll('#cell');
cellArr.forEach( cell => {
  cell.addEventListener('click', e => {
    cell.classList.add('pressed');
    // render();
  })
})