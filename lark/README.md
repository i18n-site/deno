[Github Repo](https://github.com/i18n-site/deno/tree/dev/lark)

`mod_test.js`

```js
#!/usr/bin/env bun

import Lark from "./mod.js";
import { env, exit } from "node:process";

const { LARK } = env;

if (!LARK) {
  console.error("LARK is not set");
  exit(1);
}

const send = Lark(LARK);

await send(
  "test title",
  "this is a test message",
  "https://open.larksuite.com/document/client-docs/bot-v3/add-custom-bot",
);
```

[`mod.js`](./mod.js)

```js
import curl from "@8v/curl";

export default (webhook) => async (title, text = "", url = "") => {
  const content = [];
  /*
https://open.larksuite.com/document/server-docs/im-v1/message-card/patch?lang=zh-CN
消息体长度超出限制。文本消息最大不能超过150KB，卡片及富文本消息最大不能超过30KB；此外，若消息中包含大量样式标签，会使实际消息体长度大于您输入的请求体长度。
  */
  text = text.slice(0, 9500);

  if (text) {
    content.push({
      tag: "text",
      text: url ? text + "\n" : text,
    });
  }

  if (url) {
    content.push({
      tag: "a",
      text: url,
      href: url,
    });
  }
  let r = await curl(webhook, {
    method: "POST",
    body: JSON.stringify({
      msg_type: "post",
      content: {
        post: {
          en_us: {
            title,
            content: [content],
          },
        },
      },
    }),
  });
  if (r.status != 200) {
    throw new Error(r.status + " " + (await r.text()));
  }
  r = await r.json();
  if (r.code) {
    throw new Error(r.code + ": " + r.msg);
  }
  return;
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
