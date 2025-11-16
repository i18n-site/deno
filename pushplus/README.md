[Github Repo](https://github.com/i18n-site/deno/tree/dev/pushplus)

## Usage

```js
#!/usr/bin/env bun

import pushplus from "./mod.js";
import { PUSHPLUS, PUSHPLUS_TOPIC } from "../../../js0/conf/status/NOTIFY.js";

const send = pushplus(PUSHPLUS, PUSHPLUS_TOPIC);
await send("测试", "正文");
```

## Code

[`mod.js`](./mod.js)

```js
import curl from "@8v/curl/cJson.js";

/*
token 是 body 无 用户令牌或消息令牌
channel 否 body wechat 发送渠道
title 否 body 无 消息标题
topic 否 body 无 群组编码
content 是 body 无 具体消息内容，根据不同template支持不同格式
*/

export default (token, topic) => {
  const conf = {
    token,
    topic,
    template: "txt",
  };
  return (title, content = "", url = "") => {
    if (url) {
      content += "\n" + url;
    }
    return Promise.all(
      ["wechat", "extension"].map((channel) => {
        curl("https://www.pushplus.plus/send", {
          method: "PUT",
          body: JSON.stringify({
            title,
            content,
            channel,
            ...conf,
          }),
        });
      }),
    );
  };
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
