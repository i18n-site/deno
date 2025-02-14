#!/usr/bin/env bun

import Lark from "./mod.js";
import { env, exit } from "node:process";

const { LARK } = env;

if (!LARK) {
  console.error("LARK is not set");
  exit(1);
}

const send = Lark(LARK);

await send(
  "test title",
  "this is a test message",
  "https://open.larksuite.com/document/client-docs/bot-v3/add-custom-bot",
);
