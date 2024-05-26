import { LayerItem } from "./LayerModel.js";
import BoardController from "../Board/BoardController.js";
import BoardView from "../Board/BoardView.js";
import BoardModel from "../Board/BoardModel.js";

export default class LayerController {
  model;
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.Board = new BoardController(new BoardView, new BoardModel);
    this.view.bindAddLayer(this.handleAddLayer.bind(this));
    this.render();
  }
  handleAddLayer() {
    let layerName = `new layer ${this.model.getLayerNumbers() + 1}`;
    const imageData = new ImageData(100, 100);
    const newLayer = new LayerItem({ imageData, name: layerName });
    this.model.addLayer(newLayer);

    const layers = this.model.getLayers();
    console.log(layers.size);
    if (layers.size === 1) {
      this.Board.handleRenderBoard();
    }
    this.Board.handleDraw();
    this.render();
  }
  render() {
    const layers = this.model.layers;
    this.view.renderLayers(layers);
  }
}
