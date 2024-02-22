import { getElement } from '../../utils/getElement.js';
document.addEventListener('DOMContentLoaded', () => {
  setMap(ctx);
});

const GRID_COLS = 80;
const GRID_ROWS = 50;
const CELL_SIZE = 15;

const GameSetting = {
  
};

const canvas = getElement('#grid');
const ctx = canvas.getContext('2d');

function setMap(ctx) {
  canvas.width = 800;
  canvas.height = 500;
  for (let c = 0; c < GRID_COLS; c++) {
    for (let r = 0; r < GRID_ROWS; r++) {
      ctx.beginPath();
      ctx.rect(CELL_SIZE * c, CELL_SIZE * r, CELL_SIZE , CELL_SIZE);
      ctx.strokeStyle = `#afafaf`;
      ctx.stroke();
    }
  }
}

const snake = {
  pos: ''
};

function setTarget() {
  
}

function keyEvent() {

}
