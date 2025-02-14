import send from "@8v/send";
import hsec from "@8v/hsec";

const toString = (s) => (s ? s.toString() : null);

export default async (pg, duration, kind, name, func, args) => {
  const one = async (...args) => (await pg(...args).values())[0][0];

  try {
    let state = await func(...args);
    if (state !== undefined) {
      if (state.constructor != String) {
        state = JSON.stringify(state);
      }
    } else {
      state = null;
    }

    const recover_cost =
      await one`SELECT fn.heartbeat(${kind},${name},${duration},${state})`;

    if (recover_cost > 0) {
      await send(
        "✅ " + kind + " " + name,
        "故障恢复, 耗时" + hsec(recover_cost),
      );
    }
  } catch (e) {
    console.error(e);
    e = toString(e?.message || e);
    if (
      await one`SELECT fn.heartbeatErr(${kind},${name},${duration},${e})`
    ) {
      await send("❌ " + kind + " " + name, e);
    }
  }
};
