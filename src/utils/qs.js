const qs = (selector, parent) => {

  const element = parent
    ? document.querySelector(selector)
    : parent.querySelector(selector);

  if (!element) {
    throw new Error('Parent must be HTML element');
  }

  return element;
};

const qsAll = (selector, parent) => {

  const element = parent
  ? document.querySelectorAll(selector)
  : parent.querySelectorAll(selector);

  if (!element) {
    throw new Error('Parent must be HTML element');
  }

  return element;
};

export { qs, qsAll };
