#!/usr/bin/env bun

import { exit } from "node:process";

import notify from "./mod.js";

await notify(
  "测试notify",
  "测试",
);
exit();
