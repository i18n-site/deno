#!/usr/bin/env bun

import { exit } from "node:process";

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

export default async (import_mod) => {
  await import_mod;
  await promise;
  exit();
};
