#!/usr/bin/env bun

import needwarn from "./mod.js";

const w = 1;
for (let i = 0; i < 20; i++) {
  console.log(i, needwarn(i * 60, w));
}
