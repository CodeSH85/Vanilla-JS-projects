

// condition checking
export function isObject(obj) {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
}
export function isArray(target) {
  return Array.isArray(target);
}
export function isNumber(target) {
  return typeof target === 'number';
}


// DOM
/**
 * Short hand for querySelector.
 * @param {string} selector - selector's name, e.g. #id, .class.
 * @param {HTMLElement} parent - parent element, default document.
 * @returns
 */
export function getEle(selector, parent=document) {
  const element = parent.querySelector(selector);
  if (!element) throw new Error(`Element not found, selector: ${selector}`);
  return element;
}
/**
 * 
 * @param {*} selector 
 * @param {*} parent 
 * @returns 
 */
export function getAllEle(selector, parent=document) {
  const elementList = parent.querySelectorAll(selector);
  if (!elementList) throw new Error(`Element not found, selector: ${selector}`);
  return elementList;
}

export function createEle(tag) {
  const element = document.createElement(tag);
  return element;
}

export function deleteEle(element) {
  if (element.parentNode) {
    return element.parentNode.removeChild(element);
  }
}
/**
 * 
 * @param {HTMLElement} element 
 * @param {Object} options 
 * @returns 
 */
export function getEleSize(element, options) {
  const { ...rest } = element.getBoundingClientRect(options);
  return rest;
}

export function getUid() {
  const id = 100;
  return id;
}
