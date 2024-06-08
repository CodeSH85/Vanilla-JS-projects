// DOM

import { isObject } from "./helpers.js";

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
 * Get children elements from parent.
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
export function createEle(tag='div', attrs, children) {
  const element = assignAttrs(
    document.createElement(tag),
    attrs
  );
  if (Array.isArray(children)) {
    for (const child of children) {
      // if (child) {
        if (typeof child === 'string' || typeof child === 'number') {
          element.appendChild(document.createTextNode(child));
        } else if (child instanceof HTMLElement) {
          element.appendChild(child);
        } else if (typeof child === 'object' && child.tag) {
          element.appendChild(createEle(child.tag, child.attrs, child.children));
        }
      // }
    }
  } else if (typeof children === 'string' || typeof children === 'number') {
    element.textContent = children;
  }
  return element;
}

function assignAttrs(element, attrs) {
  if (!attrs) return element;
  if (!element instanceof HTMLElement) throw new TypeError('Invalid HTML Element.');
  if (!isObject(attrs)) throw new TypeError('Attrs must be an object.');

  for (const [ key, value ] of Object.entries(attrs)) {
    if (isValidAttr(element, key)) {
      if (key === 'class') {
        element.className = value;
      } else if (key === 'style') {
        element.style.cssText = value;
      } else {
        element.setAttribute(key, value);
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

function hideEle(element) {
  
}

function css(element) {
  return element;
}