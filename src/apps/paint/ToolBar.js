
class ToolBar {
  #activeToolbar
  constructor(setting) {
    
    this.toolSetting = {...setting};
  }
  setActiveToolBar(tool) {
    
    this.activeToolBar = tool;
  }
  callTool() {
    
  }
  
}

export { ToolBar };

const test = {
  title: 'brush',
  key: 'brush',
  tools: {
    brushSize
  }
}