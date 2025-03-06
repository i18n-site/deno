#!/usr/bin/env coffee

> @8v/curl/cJson.js
  @8v/tld
  @8v/redis/R.js
  punycode

R_BANTLD = 'bantld'

export default =>
  # {default:R} = await import('@3-/redis/R.js')

  {t:update_ts, domains} = await cJson(
    'https://raw.githubusercontent.com/7c/fakefilter/main/json/data.json'
  )

  exist = new Set await R.smembers(R_BANTLD)
  to_rm = new Set Array.from exist
  newtld = new Set

  for [host,o] from Object.entries domains
    {lastseen} = o
    if (update_ts - lastseen)/86400 < 365
      host = host.toLowerCase()
      t = punycode.toUnicode(tld(host))
      to_rm.delete t
      if (
        not newtld.has(t)
      ) and not exist.has(t)
        newtld.add t

  p = R.pipeline()
  if newtld.size
    p.sadd R_BANTLD, ...newtld
  if exist.size
    p.srem R_BANTLD, ...to_rm
  await p.exec()

  console.log 'bantld add',newtld.size, 'rm', to_rm.size
  return
