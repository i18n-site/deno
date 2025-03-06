const ENV: Record<string, string | undefined> = new Proxy(
  {},
  {
    get: (_, name: string): string | undefined => Deno.env.get(name),
  },
);

export default ENV;
