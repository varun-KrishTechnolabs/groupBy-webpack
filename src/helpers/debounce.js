export const debounce = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer); // resets the old timer everytime the change is triggred
    timer = setTimeout(() => {
      func.apply(this, args); // "this" keyword is used to get the latest context everytime
    }, timeout);
  };
};
