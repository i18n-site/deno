#!/usr/bin/env bun

import curl from "./mod.js";

export default async (url, option = {}) => (await curl(url, option)).json();
