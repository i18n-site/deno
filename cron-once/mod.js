#!/usr/bin/env bun

import { argv, exit } from "node:process";

let RUNNING = 0;

const { resolve, promise } = Promise.withResolvers();

Deno.cron = async (kind, cron, func) => {
  ++RUNNING;
  try {
    console.log("cron", kind, cron);
    await func();
  } catch (e) {
    console.error(kind, e);
  } finally {
    --RUNNING;
    if (!RUNNING) {
      resolve();
    }
  }
  return;
};

await import(argv[2]);
await promise;
exit();
