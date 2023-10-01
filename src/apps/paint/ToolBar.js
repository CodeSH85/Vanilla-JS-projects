
class ToolBar {
  #activeToolbar
  constructor(setting) {
    this.toolSetting = [...setting];
  }
  get toolbar() {
    return this.toolSetting;
  }
  setActiveToolBar(tool) {
    this.activeToolBar = tool;
  }
  callTool() {
    
  }
  
}

export { ToolBar };
