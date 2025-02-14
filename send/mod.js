import { env } from "node:process";

import { Add, default as send } from "./send.js";

import Lark from "@8v/lark";
import ApiMail from "@8v/apimail";
import WxPush from "@8v/wxpush";

Add(env, {
  Lark,
  ApiMail,
  WxPush: (token_topic) => WxPush(...JSON.parse(token_topic)),
});

export default send;
