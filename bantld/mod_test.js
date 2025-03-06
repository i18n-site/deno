#!/usr/bin/env bun

import { exit } from "node:process";
import bantld from "./mod.js";

await bantld();
exit();
