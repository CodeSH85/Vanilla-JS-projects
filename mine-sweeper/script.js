import { createBoard } from "./minesweep.js";

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 2;

const board = createBoard(10, 10);
const boardElement = document.getElementById('board');


board.forEach(row => {
  row.forEach(tile => {
    boardElement.append(tile.element);
  })
})

boardElement.style.setProperty('--size', BOARD_SIZE);