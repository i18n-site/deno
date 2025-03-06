import Lark from "@8v/lark";
import WxPush from "@8v/wxpush";

export const CONF = [...Object.entries({
  Lark,
  WxPush: (token_topic) => WxPush(...JSON.parse(token_topic)),
})];

export const fromEnv = (env) => {
  const send_li = [],
    name_li = [];

  CONF.forEach(([name, func]) => {
    const conf = env[name];
    if (conf) {
      send_li.push(func(conf));
      name_li.push(name);
    }
  });
  return [send_li, name_li];
};

export default ([send_li, name_li]) => {
  return async (title, txt = "", url = "") => {
    let pos = 0;
    for (
      const i of await Promise.allSettled(
        send_li.map((send) => send(title, txt, url)),
      )
    ) {
      if (i.reason) {
        throw new Error(name_li[pos] + ": " + i.reason?.message);
      }
      ++pos;
    }
  };
};
