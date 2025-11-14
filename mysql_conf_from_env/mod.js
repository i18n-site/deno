#!/usr/bin/env bun

import { parseEnv } from "node:util";
import read from "@3-/read";
import bool from "@8v/bool";

export default (env_path) => {
  return Object.fromEntries(
    Object.entries(parseEnv(read(env_path))).map(([key, val]) => {
      key = key.slice(6).toLocaleLowerCase();

      switch (key) {
        case "compress":
          val = bool(val);
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
