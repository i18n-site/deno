#!/usr/bin/env bun

import { parseEnv } from "node:util";
import read from "@3-/read";

export default (env_path) => {
  console.log(parseEnv(read(env_path)));
  return Object.fromEntries(
    Object.entries(parseEnv(read(env_path))).map(([key, val]) => {
      key = key.slice(6).toLocaleLowerCase();

      switch (key) {
        case "compress":
          if (val && !["false", "0"].includes(val)) {
            val = true;
          }
          break;
        case "pwd":
          key = "password";
          break;
        case "ssl":
          val = JSON.parse(val);
          break;
      }
      return [key, val];
    }),
  );
};
