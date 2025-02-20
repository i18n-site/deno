#!/usr/bin/env bun

import retry from "./mod.js";

let retryed = 0;

const test = retry(
  () => {
    if (++retryed < 3) {
      throw new Error("test");
    }
  },
);

await test();
