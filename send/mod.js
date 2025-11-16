import Send from "./Send.js";
import pushplus from "@8v/pushplus";

export default (conf) => {
  const send_li = [],
    name_li = [];

  if (conf.PUSHPLUS) {
    send_li.push(pushplus(...conf.PUSHPLUS));
    name_li.push("pushplus");
  }
  return Send(send_li, name_li);
};
