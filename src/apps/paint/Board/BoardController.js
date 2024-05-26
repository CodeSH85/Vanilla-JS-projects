
export default class BoardController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }
  handleCreateBoard() {
    this.view.render();
  }
  handleDraw() {
    this.view.bindBoardMousedown(this.model.setImageData.bind(this));
  }
  handleRenderBoard(value) {
    this.view.renderBoard();
  }
}
