#!/usr/bin/env bun

import TIDB from "./conf/TIDB.js";
import mysql from "./mod.js";

const DB = mysql(TIDB);
const hash = await DB.q00("SELECT ip FROM vps LIMIT 1");
console.log(hash, typeof hash, hash instanceof Buffer);
process.exit(0);
