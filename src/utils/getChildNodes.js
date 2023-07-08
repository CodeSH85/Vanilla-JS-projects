
function getChildNodes(element) {
  const childNodes = element.children;
  const nodes = [];

  childNodes.forEach(node => {
    nodes.push(node);
  });
}

export default getChildNodes