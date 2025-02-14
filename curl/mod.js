export default async (url, option = {}) => {
  const ctrl = new AbortController();

  option.signal = ctrl.signal;

  const timer = setTimeout(() => {
    ctrl.abort();
  }, option.timeout || 2e4);
  try {
    return await fetch(url, option);
  } finally {
    clearTimeout(timer);
  }
};
