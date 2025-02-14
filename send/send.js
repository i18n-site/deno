export const SEND_LI = [];
export const NAME_LI = [];

export const Add = (env, map) =>
  Object.entries(map).forEach(([name, func]) => {
    const conf = env[name];
    if (conf) {
      SEND_LI.push(func(conf));
      NAME_LI.push(name);
    }
  });

new Proxy(
  {},
  {
    get: (_, name) => (send) => (conf) => {
      SEND_LI.push(send(conf));
      NAME_LI.push(name);
    },
  },
);

export default async (title, body = "", url = "") => {
  let pos = 0;
  for (
    const i of await Promise.allSettled(
      SEND_LI.map((send) => send(title, body, url)),
    )
  ) {
    if (i.reason) {
      throw new Error(NAME_LI[pos] + ": " + i.reason?.message);
    }
    ++pos;
  }
};
