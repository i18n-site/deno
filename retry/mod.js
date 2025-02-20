import sleep from "@3-/sleep";

export default (func, times = 3) => async (...args) => {
  let n = 0;
  while (1) {
    try {
      return await func(...args);
    } catch (e) {
      if (times < ++n) {
        throw e;
      }
      console.error(e, args);
      await sleep(1e3);
    }
  }
};
