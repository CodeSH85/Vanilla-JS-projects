
/*
  refer to lodash
*/

const throttle = (func, delay, options) => {

  /*
  * requestAnimationFrame
  * skip
  */

  let isTimeout = false,
      useRAF = false
      
  if (typeof func !== 'function') {
    throw new Error('function expected.');
  }
  
  // func(...args)
  if (isTimeout) return;

  function startTime(cb, delay) {
    if (useRAF) {
      return requestAnimationFrame(cb);
    }
    return setTimeout(cb, delay);
  }

  if (typeof options === 'Object') {
    
  }

  // return startTime(func, delay);
  function throttled(func, delay) {
    return setTimeout(func, delay);
  }
  return throttled;
}

export default throttle;