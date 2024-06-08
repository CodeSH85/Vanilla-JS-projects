

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

export function getUid() {
  const id = 100;
  return id;
}

export function debounce(fn, time) {
  let timeout = null;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(fn, time);
  }
}

export function throttle(fn, time) {
  let timeout = null;
  return function() {
    
  }
}
