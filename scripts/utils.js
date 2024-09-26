export function throttle(fn, limit) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall < limit) {
      return;
    }
    lastCall = now;
    return fn(...args);
  };
}
