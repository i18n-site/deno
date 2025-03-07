import Lark from "@8v/lark";
import WxPush from "@8v/wxpush";

export const CONF = [...Object.entries({
  Lark,
  WxPush: (token_topic) => WxPush(...JSON.parse(token_topic)),
})];

export default (env) => {
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
