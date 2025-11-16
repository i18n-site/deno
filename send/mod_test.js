#!/usr/bin/env bun

import * as CONF from "../../../js0/conf/status/NOTIFY.js";
import Send from "./mod.js";

const send = Send(CONF);

await send("测试", "正文");
