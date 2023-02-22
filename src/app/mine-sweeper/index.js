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
  let totalCells = cols * rows;
  let minesArr = [];
  while (minesArr.length < mines) {
    let mineIndex = Math.floor(Math.random() * totalCells);
    if (!minesArr.includes(mineIndex)) {
      minesArr.push(mineIndex);
    }
  }
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.id = 'cell-' + i;
    cell.dataset.num = i;
    if (minesArr.includes(i)) {
      cell.classList.add('mine');
    }
    board.appendChild(cell);
  }

}

createBoard(10, 10, 10);

const cellArr = document.querySelectorAll('.cell');
cellArr.forEach( cell => {
  cell.addEventListener('click', e => {
    cell.classList.add('pressed');
    console.log(e.target.dataset.num);
    console.log(e.target);
  })
})
