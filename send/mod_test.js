import { env, exit } from "node:process";
import send from "./mod.js";

const { Lark } = env;

if (!Lark) {
  console.error("Lark is not set");
  exit(1);
}

await send(
  "test title",
  "this is a test message",
  "https://open.larksuite.com/document/client-docs/bot-v3/add-custom-bot",
);
