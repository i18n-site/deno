[Github Repo](https://github.com/i18n-site/deno/tree/dev/bantld)

## Usage

```js
#!/usr/bin/env bun

import { exit } from "node:process";
import bantld from "./mod.js";

await bantld();
exit();
```

## Code

[`mod.js`](./mod.js)

```js
#!/usr/bin/env -S node --trace-uncaught --expose-gc --unhandled-rejections=strict
var R_BANTLD;

import cJson from "@8v/curl/cJson.js";

import tld from "@8v/tld";

import R from "@8v/redis/R.js";

import punycode from "punycode";

R_BANTLD = "bantld";

export default async () => {
  var domains, exist, host, lastseen, newtld, o, p, ref, t, to_rm, update_ts, x;
  ({
    // {default:R} = await import('@3-/redis/R.js')
    t: update_ts,
    domains,
  } = await cJson(
    "https://raw.githubusercontent.com/7c/fakefilter/main/json/data.json",
  ));
  exist = new Set(await R.smembers(R_BANTLD));
  to_rm = new Set(Array.from(exist));
  newtld = new Set();
  ref = Object.entries(domains);
  for (x of ref) {
    [host, o] = x;
    ({ lastseen } = o);
    if ((update_ts - lastseen) / 86400 < 365) {
      host = host.toLowerCase();
      t = punycode.toUnicode(tld(host));
      to_rm.delete(t);
      if ((!newtld.has(t)) && !exist.has(t)) {
        newtld.add(t);
      }
    }
  }
  p = R.pipeline();
  if (newtld.size) {
    p.sadd(R_BANTLD, ...newtld);
  }
  if (exist.size) {
    p.srem(R_BANTLD, ...to_rm);
  }
  await p.exec();
  console.log("bantld add", newtld.size, "rm", to_rm.size);
};
```

## About

## About

This project is an open-source component of
[i18n.site ⋅ Internationalization Solution](https://i18n.site).

- [i18 : MarkDown Command Line Translation Tool](https://i18n.site/i18)

  The translation perfectly maintains the Markdown format.

  It recognizes file changes and only translates the modified files.

  The translated Markdown content is editable; if you modify the original text
  and translate it again, manually edited translations will not be overwritten
  (as long as the original text has not been changed).

- [i18n.site : MarkDown Multi-language Static Site Generator](https://i18n.site/i18n.site)

  Optimized for a better reading experience

## 关于

本项目为 [i18n.site ⋅ 国际化解决方案](https://i18n.site) 的开源组件。

- [i18 : MarkDown命令行翻译工具](https://i18n.site/i18)

  翻译能够完美保持 Markdown 的格式。能识别文件的修改，仅翻译有变动的文件。

  Markdown
  翻译内容可编辑；如果你修改原文并再次机器翻译，手动修改过的翻译不会被覆盖（如果这段原文没有被修改）。

- [i18n.site : MarkDown多语言静态站点生成器](https://i18n.site/i18n.site)
  为阅读体验而优化。
