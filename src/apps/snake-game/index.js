import { getElement } from '../../utils/getElement.js';

document.addEventListener('DOMContentLoaded', () => {
  setMap();
  setFood();
})

const GRID_COLS = 50, GRID_ROWS = 30;
const CELL_SIZE = 15;
const CANVAS_HEIGHT = GRID_ROWS * CELL_SIZE;
const CANVAS_WIDTH = GRID_COLS * CELL_SIZE;

const canvas = getElement('#grid');
const ctx = canvas.getContext('2d');

let gameStart = false;
let gameOver = false;

function setMap() {
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);
}

function Snake() {
  const color = '#00f2f2';
  const body = [
    {
      x: Math.floor(GRID_COLS / 2),
      y: Math.floor(GRID_ROWS / 2)
    }
  ];
  return {color, body}
}

function Food() {
  const x = Math.floor(Math.random() * GRID_COLS);
  const y = Math.floor(Math.random() * GRID_ROWS);
  return {
    x, y
  }
}

let foodX = Food().x;
let foodY = Food().y;
function setFood() {
  ctx.fillStyle = '#f20000';
  ctx.fillRect(foodX * CELL_SIZE, foodY * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function resetFood() {
  foodX = Food().x;
  foodY = Food().y;
}

const snake = Snake();
let snakeX = snake.body[0].x, snakeY = snake.body[0].y;
let moveX = 0, moveY = 0;
function animation() {
  setMap();
  setFood();
  ctx.fillStyle = snake.color;
  snakeX += moveX;
  snakeY += moveY;
  if (snake.body.length > 1) {
    for (let i = snake.body.length - 1; i > 0; i--) {
      snake.body[i] = { ...snake.body[i - 1] };
    }
  }

  snake.body[0].x += moveX;
  snake.body[0].y += moveY;

  if (snake.body[0].x === foodX && snake.body[0].y === foodY) {
    const newBodyNode = { ...snake.body[snake.body.length - 1] };
    snake.body.push(newBodyNode);
    resetFood();
    console.log('food!');
    console.log(snake.body);
  }

  // draw the snake
  for (const node of snake.body) {
    ctx.fillRect(
      node.x * CELL_SIZE,
      node.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
  }
  if (!gameOver) {
    setTimeout(() =>
      window.requestAnimationFrame(animation)
    , 120);
  }
}

document.addEventListener('keydown', keyEvent);
function keyEvent(e) {
  const { code } = e;
  switch (code) {
    case 'ArrowUp':
      if (moveY !== 1) {
        moveX = 0;
        moveY = -1;
      }
      break;
    case 'ArrowDown':
      if (moveY !== -1) {
        moveX = 0;
        moveY = 1;
      }
      break;
    case 'ArrowRight':
      if (moveX !== -1) {
        moveX = 1;
        moveY = 0;
      }
      break;
    case 'ArrowLeft':
      if (moveX !== 1) {
        moveX = -1;
        moveY = 0;
      }
      break;
    case 'Enter':
      window.requestAnimationFrame(animation);
    default:
      break;
  }
}
