import { qs } from "../../utils/qs.js";

class View {
  constructor() {
    this.layerSection = qs('#layerSection');
    this.canvasSection = qs('#canvasContainer');
  }
}
export default View;