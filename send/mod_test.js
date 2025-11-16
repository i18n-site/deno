#!/usr/bin/env bun

import pushplus from "./mod.js";
import { PUSHPLUS, PUSHPLUS_TOPIC } from "../../../js0/conf/status/NOTIFY.js";

const send = pushplus(PUSHPLUS, PUSHPLUS_TOPIC);
await send("测试", "正文");
