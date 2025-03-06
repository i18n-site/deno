[Github Repo](https://github.com/i18n-site/deno/tree/dev/raise)

[mod.js](./mod.js)

```coffee
import { dump } from "@8v/yml";

export default (cls) => {
  const raise = (...args) => {
    const args_len = args.length;

    if (args_len == 0) {
      return;
    }

    if (args_len == 1 && Array.isArray(args[0])) {
      raise(...args[0]);
      return;
    }

    const li = [];

    for (let i of args) {
      const len = li.length;
      if (i.constructor != String) {
        i = dump(i).trimEnd();
        if (len) {
          i = "\n" + i;
        }
      } else {
        i = i.trim();
        if (len && i.length + li.at(-1).length > 32) {
          i = "\n" + i;
        }
      }
      li.push(i);
    }

    throw new cls(li.join(" "));
  };
  return raise;
};
```

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
