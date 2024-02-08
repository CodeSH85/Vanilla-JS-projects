const CANVAS_SIZE = {
  width: 800,
  height: 800
};
const BOARD_SIZE = 32;

const cell = {
  state: 'dead',
  color: this.state === 'dead' ? '#ff3456' : '#56ff01',
  width: CANVAS_SIZE.width / BOARD_SIZE,
  height: CANVAS_SIZE.height / BOARD_SIZE,
};

document.addEventListener('DOMContentLoaded', () => {
  createCanvas()
})

const grid = [];
for (let i = 0; i < BOARD_SIZE; i++) {
  grid.push(Array.from({ length: BOARD_SIZE }, () => cell));
}

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

function createCanvas() {
  canvas.width = CANVAS_SIZE.width;
  canvas.height = CANVAS_SIZE.height;
}

canvas.addEventListener('click', (e) => {
  render(e);
});

function render(e) {
  ctx.fillStyle = cell.color;
  for (let i = 0; i < BOARD_SIZE; i++) {
    const x = i * cell.width;
    const y = i * cell.height;
    ctx.fillRect(e.offsetX, e.offsetY, cell.width, cell.height);
  }
}


const RULE_SETS = {
  "alive": ['dead', 'dead', 'dead', 'alive', 'dead'],
  "dead": ['dead', 'dead', 'alive', 'alive', 'dead']
};
