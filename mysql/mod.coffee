#!/usr/bin/env coffee

> mysql2/promise > createConnection

export default (option)=>
  conn = await createConnection(
    Object.assign(
      {
        # connectTimeout: The milliseconds before a timeout occurs during the initial connection to the MySQL server. (Default: 10000)
        # connectTimeout: 10000
        rowsAsArray: true
        typeCast: (field, next)=>
          {type} = field
          if (
            not [32,512].includes(
              field.length
            ) and type == 'VAR_STRING'
          ) or type.endsWith('BLOB')
            return field.buffer().toString('utf8')
          return next()
      },
      option
    )
  )

  q = (
    sql
    arg...
  ) =>
    (
      await conn.query(
        sql
        arg
      )
    )[0]

  q0 = (
    sql
    arg...
  ) =>
    (await q(sql, ...arg))[0]

  q00 = (
    sql
    arg...
  ) =>
    r = await q0(sql, ...arg)
    if r
      return r[0]
    return

  {
    conn
    q
    q0
    q00
  }
