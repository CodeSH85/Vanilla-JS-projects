
export function isObject(obj) {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
}

export function getEle(selector, parent=document) {
  const element = parent.querySelector(selector);
  if (!element) throw new Error(`Element not found, selector: ${selector}`);
  return element;
}

export function getAllEle(selector, parent=document) {
  const elementList = parent.querySelectorAll(selector);
  if (!elementList) throw new Error(`Element not found, selector: ${selector}`);
  return elementList;
}
