[Github Repo](https://github.com/i18n-site/deno/tree/dev/curl)

[mod.js](./mod.js)

```coffee
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
```
