/*


*/

function getStyle (DOMElement, property, pureNumValue=false) {
  if (!(DOMElement instanceof Element)) {
    throw new Error('DOM Element expected.');
  }

  let style = window.getComputedStyle(DOMElement).getPropertyValue(property);

  if (!pureNumValue) {
    return style;
  }
  const numRegex = /\d+/;
  const result = style.match(numRegex);

  if (result) return parseInt(result[0]);

}

export default getStyle;
