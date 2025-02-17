export default (func, times = 3) => async (...args) => {
  let n = 0;
  while (1) {
    try {
      return await func(...args);
    } catch (e) {
      if (times == n++) {
        throw e;
      }
      console.error(e);
    }
  }
};
