#!/usr/bin/env bun

import Raise from "./mod.js";

class MyError extends Error {}

const raise = Raise(MyError);

try {
  raise({ msg: "just test yml dump" });
} catch (e) {
  console.error(e.message);
}
