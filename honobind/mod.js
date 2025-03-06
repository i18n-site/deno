import honofn from "@8v/honofn";

export default (app) => {
  const proxy = new Proxy(
    {},
    {
      get: (_, method) => {
        method = app[method];
        return (map) => {
          Object.entries(map).forEach(
            ([path, func]) => {
              method(path, honofn(func));
            },
          );
          return proxy;
        };
      },
    },
  );
  return proxy;
};
