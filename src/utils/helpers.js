

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

/**
 * 
 * @param {string} tag - element's tag name, default div.
 * @param {object} [attrs] - optional, element's attributes.
 * @returns 
 */
export function createEle(tag='div', attrs) {
  const element = assignAttrs(
    document.createElement(tag),
    attrs
  );
  return element;
}
function assignAttrs(element, attrs) {
  if (!attrs) return element;
  if (!element instanceof HTMLElement) throw new TypeError('Invalid HTML Element.');
  if (!isObject(attrs)) throw new TypeError('Attrs must be an object.');

  for (const [ key, value ] of Object.entries(attrs)) {
    if (isValidAttr(element, key)) {
      if (key === 'class') {
        element.classList = value;
      } else if (key === 'style') {
        element.style.cssText = value;
      } else {
        element.setAttributes(value);
      }
    }
  }
  return element;
}

function isValidAttr(element, attr) {
  return attr in element || element.hasAttribute(attr);
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
