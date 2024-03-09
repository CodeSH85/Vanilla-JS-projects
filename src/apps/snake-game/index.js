import { getElement } from '../../utils/getElement.js';

document.addEventListener('DOMContentLoaded', () => {
  setMap(ctx);
  setGame(ctx);
  window.requestAnimationFrame(animation);
})

const GRID_COLS = 50;
const GRID_ROWS = 30;
const CELL_SIZE = 15;
const CANVAS_HEIGHT = GRID_ROWS * CELL_SIZE;
const CANVAS_WIDTH = GRID_COLS * CELL_SIZE;

const canvas = getElement('#grid');
const ctx = canvas.getContext('2d');

let gameStart = false;
let gameOver = false;
let step = 10;

function setMap(ctx) {
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);
}

function setGame(ctx) {
  const { row: foodRow, col: foodCol } = Food();
  ctx.fillStyle = '#f20000';
  ctx.fillRect(foodRow * CELL_SIZE, foodCol * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

const snake = Snake();
let vx = snake.head.col, vy = snake.head.row;
let mx = 0, my = 0;
function animation() {
  ctx.fillStyle = snake.color;
  vx += mx;
  vy += my;
  let x = (vx) * CELL_SIZE;
  let y = (vy) * CELL_SIZE;
  ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
  if (step === 0) {
    gameOver = true;
  }
  if (!gameOver) {
    setTimeout(() =>
      window.requestAnimationFrame(animation)
    , 80);
  }
}

function Snake(length) {
  const direction = [0, 1];
  const color = '#00f2f2';
  const head = {
    col: Math.floor(GRID_COLS / 2),
    row: Math.floor(GRID_ROWS / 2)
  };
  const body = [];
  function turn(x, y) {
    direction[0] = x
    direction[1] = y
  }
  return {
    color,
    head,
    body,
    turn,
    direction
  }
}

function Food() {
  const row = Math.floor(Math.random() * GRID_COLS);
  const col = Math.floor(Math.random() * GRID_ROWS);
  return {
    row, col
  }
}

let direction = 'up';
document.addEventListener('keydown', keyEvent);
function keyEvent(e) {
  const { code } = e;
  switch (code) {
    case 'ArrowUp':
      mx = 0;
      my = -1;
      break;
    case 'ArrowDown':
      mx = 0;
      my = 1;
      break;
    case 'ArrowRight':
      mx = 1;
      my = 0;
      direction = 'right';
      break;
    case 'ArrowLeft':
      mx = -1;
      my = 0;
      break;
    default:
      break;
  }
}
