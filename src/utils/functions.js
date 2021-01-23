export const debounce = (fn, delay) => {
    let timeoutID;
    return (...args) => {
        if (timeoutID) {
            clearTimeout(timeoutID);
        }
        timeoutID = setTimeout(() => {
            timeoutID = null;
            fn(...args);
        }, delay)
    }
}

export const getRandomInRange = (min, max) => {
    return Math.trunc(Math.random() * (max - min) + min);
  }