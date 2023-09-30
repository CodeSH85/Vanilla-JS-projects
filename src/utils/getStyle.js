function getStyle (element, property, pureNumValue=false) {

  if (!(element instanceof Element)) {
    throw new Error('DOM Element expected.');
  }

  let style = window.getComputedStyle(element).getPropertyValue(property);
  if (!property) style = window.getComputedStyle(element);

  if (!pureNumValue) return style;
  const numRegex = /\d+/;
  const result = style.match(numRegex);

  if (result) return parseInt(result[0]);

}

export default getStyle;
