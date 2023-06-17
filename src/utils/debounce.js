
/*
  refer to lodash
*/

const debounce = (func, delay, options) => {

  /*
  * requestAnimationFrame
  * skip
  */

  let lastArgs,
      lastThis,
      result,
      timerId

  let lastInvokeTime = 0,
      useRAF = false,
      holding = true
      
  if (typeof func !== 'function') {
    throw new Error('function excepted.');
  }
  
  // func(...args)
  if (isTimeout) {
    return;
  }

  delay += delay || 0;

  function invokeFunc(time) {
    const args = lastArgs;
    const thisArgs = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArgs, args);
    return result;
  }

  function startTimer(cb, delay) {
    if (useRAF) {
      return requestAnimationFrame(cb);
    }
    return setTimeout(cb, delay);
  }

  function shouldInvoke(time) {
    invokeFunc(lastArgs)
  }


  function debounced(...args) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);
    return;
  }

}

export default debounce;