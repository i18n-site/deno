import Send from "./Send.js";
import pushplus from "@8v/pushplus";
import lark from "@8v/lark";

export default (conf) => {
  const send_li = [],
    name_li = [];
  if (conf.LARK) {
    send_li.push(lark(conf.LARK));
    name_li.push("lark");
  }
  if (conf.PUSHPLUS) {
    send_li.push(pushplus(...conf.PUSHPLUS));
    name_li.push("pushplus");
  }
  return Send(send_li, name_li);
};
