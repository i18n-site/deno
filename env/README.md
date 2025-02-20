[Github Repo](https://github.com/i18n-site/deno/tree/dev/env)

[mod.ts](./mod.ts)

```coffee
const ENV: Record<string, string | undefined> = new Proxy(
  {},
  {
    get: (_, name: string): string | undefined => Deno.env.get(name)
  }
);

export default ENV;
```
