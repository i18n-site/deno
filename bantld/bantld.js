#!/usr/bin/env -S node --trace-uncaught --expose-gc --unhandled-rejections=strict
var R_BANTLD;

import cJson from "@8v/curl/cJson.js";

import tld from "@8v/tld";

import R from "@8v/redis/R.js";

import punycode from "punycode";

R_BANTLD = "bantld";

export default async () => {
  var domains, exist, host, lastseen, newtld, o, p, ref, t, to_rm, update_ts, x;
  ({
    // {default:R} = await import('@3-/redis/R.js')
    t: update_ts,
    domains,
  } = await cJson(
    "https://raw.githubusercontent.com/7c/fakefilter/main/json/data.json",
  ));
  exist = new Set(await R.smembers(R_BANTLD));
  to_rm = new Set(Array.from(exist));
  newtld = new Set();
  ref = Object.entries(domains);
  for (x of ref) {
    [host, o] = x;
    ({ lastseen } = o);
    if ((update_ts - lastseen) / 86400 < 365) {
      host = host.toLowerCase();
      t = punycode.toUnicode(tld(host));
      to_rm.delete(t);
      if ((!newtld.has(t)) && !exist.has(t)) {
        newtld.add(t);
      }
    }
  }
  p = R.pipeline();
  if (newtld.size) {
    p.sadd(R_BANTLD, ...newtld);
  }
  if (exist.size) {
    p.srem(R_BANTLD, ...to_rm);
  }
  await p.exec();
  console.log("bantld add", newtld.size, "rm", to_rm.size);
};
