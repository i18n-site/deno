#!/usr/bin/env bun

import { env, exit } from "node:process";
import { default as send, lark } from "./mod.js";

const { LARKBOT } = env;

if (!LARKBOT) {
  console.error("LARKBOT is not set");
  exit(1);
}

await lark(LARKBOT);

await send(
  "test title",
  "this is a test message",
  "https://open.larksuite.com/document/client-docs/bot-v3/add-custom-bot",
);
