[Github Repo](https://github.com/i18n-site/deno/tree/dev/needwarn)

## Usage

```js
#!/usr/bin/env bun

import needwarn from "./mod.js";

const w = 1;
for (let i = 0; i < 20; i++) {
  console.log(i, needwarn(i * 60, w));
}
```

## Code

[`mod.js`](./mod.js)

```js
export default (diff, warn) => {
  if (diff < 600) {
    return warn < 1;
  }

  if (diff < 3600) {
    return warn < 2;
  }

  if (diff < 86400) {
    return warn < 3;
  }

  return warn - 2 < diff / 86400;
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
