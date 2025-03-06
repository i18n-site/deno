#!/usr/bin/env bun

import WxPush from "./mod.js";
import { env } from "node:process";

const wxpush = WxPush(env.TOKEN, env.ID);

console.log(
  await wxpush(
    "Origin, Access-Control-Request-Method, Access-Control-Request-Headers",
    "test content",
    "https://baidu.com",
  ),
);
