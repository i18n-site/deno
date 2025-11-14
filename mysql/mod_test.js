#!/usr/bin/env bun

import TIDB from "./conf/TIDB.js";
import mysql from "./mod.js";

const DB = mysql(TIDB);
