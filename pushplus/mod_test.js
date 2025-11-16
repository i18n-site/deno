#!/usr/bin/env bun

import pushplus from "./mod.js";
import conf from "../../../js0/conf/status/NOTIFY.js";

const send = pushplus(...conf.PUSHPLUS);
await send("测试", "正文");
