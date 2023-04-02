const BOARD_SIZE = 10;
let NUMBER_OF_MINES = 2;

document.addEventListener('DOMContentLoaded', () => {
  // createBoard(10, 10, 10);
})

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
  let counter = 0
  let minesArr = [];
  // set mines
  while (minesArr.length < mines) {
    let mineIndex = Math.floor(Math.random() * totalCells);
    if (!minesArr.includes(mineIndex)) {
      minesArr.push(mineIndex);
    }
  }

  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const cell = document.createElement('div');
      cell.dataset.col = row;
      cell.dataset.row = col;
      cell.classList.add('cell');
      counter ++;
      cell.id = 'cell-' + counter;
      cell.dataset.index = counter;
      if (minesArr.includes(counter)) {
        cell.classList.add('mine');
      }
      board.appendChild(cell);
    }
  }
}

createBoard(10, 10, 10);

const cellArr = document.querySelectorAll('.cell');
cellArr.forEach( cell => {
  cell.addEventListener('click', e => {
    clickCell(e.target);
  })
})

function clickCell(cell) {
  cell.classList.add('pressed');
  let count = nextToMine(cell);
  if (count == 0) {
    let neighbors = getNonMineNeighbors(cell);
    for (let neighbor of neighbors) {
      if (!neighbor.classList.contains('pressed') && nextToMine(neighbor)=== 0) {
        clickCell(neighbor);
      }
    }
  }
}

function getNonMineNeighbors(cell) {
  let row = Number(cell.dataset.row);
  let col = Number(cell.dataset.col);
  let neighbors = [];
  for(let i = row-1; i <= row+1; i++) {
    for (let n = col-1; n <= col+1; n++) {
      if(i === row && n === col) {
        continue;
      }
      const targetCell = 
      document.querySelector(`[data-col='${n}'][data-row='${i}']`);
      if (targetCell && !targetCell.classList.contains('mine')) {
        neighbors.push(targetCell);
      }
    }
  }
  return neighbors;
}

function nextToMine(cell) {
  let row = Number(cell.dataset.row);
  let col = Number(cell.dataset.col);
  console.log(`row: ${row}, col: ${col}`);
  let counter = 0
  for(let i = row-1; i <= row+1; i++) {
    for (let n = col-1; n <= col+1; n++) {
      if(i === row && n === col) {
        continue;
      }
      const targetCell = 
      document.querySelector(`[data-col='${n}'][data-row='${i}']`);
      if (targetCell && targetCell.classList.contains('mine')) {
        counter++;
      }
    }
  }
  return counter;
}
