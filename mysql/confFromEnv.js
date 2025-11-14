#!/usr/bin/env bun

import parseEnv from "parse-dotenv";

export default (env_path) =>
  Object.fromEntries(
    Object.entries(
      parseEnv(env_path).map(([key, val]) => {
        key = key.slice(6).toLocaleLowerCase();

        switch (key) {
          case "pwd":
            key = "password";
            break;
          case "ssl":
            val = JSON.parse(val);
            break;
        }
        return [key, val];
      }),
    ),
  );
