[Github Repo](https://github.com/i18n-site/deno/tree/dev/mysql)

## Usage

```js
#!/usr/bin/env bun

// import mysql from "./mod.js";
```

## Code

[`mod.coffee`](./mod.coffee)

```js
#!/usr/bin/env coffee

> mysql2/promise > createConnection

export default (option)=>
  conn = await createConnection(
    Object.assign(
      {
        # connectTimeout: The milliseconds before a timeout occurs during the initial connection to the MySQL server. (Default: 10000)
        # connectTimeout: 10000
        rowsAsArray: true
        typeCast: (field, next)=>
          {type} = field
          if (
            not [32,512].includes(
              field.length
            ) and type == 'VAR_STRING'
          ) or type.endsWith('BLOB')
            return field.buffer().toString('utf8')
          return next()
      },
      option
    )
  )

  q = (
    sql
    arg...
  ) =>
    (
      await conn.query(
        sql
        arg
      )
    )[0]

  q0 = (
    sql
    arg...
  ) =>
    (await q(sql, ...arg))[0]

  q00 = (
    sql
    arg...
  ) =>
    r = await q0(sql, ...arg)
    if r
      return r[0]
    return

  {
    conn
    q
    q0
    q00
  }
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
