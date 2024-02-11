const CANVAS_SIZE = {
  width: 800,
  height: 800
};

const GRID_COLS = 64;
const GRID_ROWS = 64;
const CELL_WIDTH = CANVAS_SIZE.width / GRID_COLS;
const CELL_HEIGHT = CANVAS_SIZE.height / GRID_ROWS;

// dead: 0, alive: 1,
const COLOR_SETS = ['#0f0f0f', '#f30212'];
const RULE_SETS = {
  "alive": ['dead', 'dead', 'dead', 'alive', 'dead', 'dead', 'dead', 'dead'],
  "dead": ['dead', 'dead', 'alive', 'alive', 'dead', 'dead', 'dead', 'dead'],
};

function Cell(state, coordX, coordY) {
  this.state = state;
  this.coordX = coordX;
  this.coordY = coordY;
  this.color = getColor;
  function getColor() {
    return COLOR_SETS[this.state];
  }
}

document.addEventListener('DOMContentLoaded', () => {
  createCanvas();
  render(ctx);
})

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const gridCanvas = document.querySelector('#grid');
const gridCtx = gridCanvas.getContext('2d');

function setGridBorder(ctx) {
  for (let c = 0; c < GRID_COLS; c++) {
    for (let r = 0; r < GRID_ROWS; r++) {
      ctx.beginPath();
      ctx.rect(CELL_WIDTH * c, CELL_HEIGHT * r, CELL_WIDTH , CELL_HEIGHT);
      ctx.strokeStyle = `#2f2f2f`;
      ctx.stroke();
    }
  }
}

function createCanvas() {
  canvas.width = gridCanvas.width = CANVAS_SIZE.width;
  canvas.height = gridCanvas.height = CANVAS_SIZE.height;
  setGridBorder(gridCtx);
}

const grid = [];
const newGrid = [];
for (let c = 0; c < GRID_COLS; c++) {
  grid.push(Array.from({ length: GRID_ROWS }, (_, r) => new Cell(0, c, r)));
}

canvas.addEventListener('click', (e) => {
  const col = Math.floor(e.offsetX / CELL_WIDTH);
  const row = Math.floor(e.offsetY / CELL_HEIGHT);
  const cell = grid[col][row];
  cell.state = 1;
  render(ctx);
});

function render(ctx) {
  for (let c = 0; c < GRID_COLS; c++) {
    for (let r = 0; r < GRID_ROWS; r++) {
      const x = r * CELL_WIDTH;
      const y = c * CELL_HEIGHT;
      start ? grid[r][c].state = checkState(grid[r][c]) : '' ;
      ctx.fillStyle = grid[r][c].color();
      ctx.fillRect(x, y, CELL_WIDTH - 2, CELL_HEIGHT - 2);
    }
  }
}

function checkState({ state, coordX, coordY }) {
  const neighbors = [];
  for (let c = -1; c < 2; c++) {
    for (let r = -1; r < 2; r++) {
      if (
        r === 0 && c === 0 ||
        coordX + c < 0 || coordY + r < 0 ||
        coordX + c >= GRID_COLS || coordY + r >= GRID_ROWS
      ) continue;
      neighbors.push(grid[coordX + c][coordY + r].state);
    }
  }
  switch (state) {
    case 1: {
      const liveNeighborCount = neighbors.filter(cell => cell === 1).length;
      if (liveNeighborCount < 2 || liveNeighborCount > 3) {
        return 0;
      } else {
        return 1;
      }
    }
    case 0: {
      const liveNeighborCount = neighbors.filter(cell => cell === 1).length;
      if (liveNeighborCount === 3) {
        return 1;
      } else {
        return 0;
      }
    } break;
    default:
      break;
  }
}

const runBtn = document.querySelector('#run');
runBtn.addEventListener('click', () => {
  runStart();
})

let start = false;
let timeout;

function runStart() {
  if (!start) {
    timeout = setInterval(() => {
      render(ctx);
    }, 500)
    start = true;
  } else {
    clearInterval(timeout);
    start = false;
  }
}





