export default ([send_li, name_li]) => {
  return async (title, txt = "", url = "") => {
    let pos = 0;
    for (
      const i of await Promise.allSettled(
        send_li.map((send) => send(title, txt, url)),
      )
    ) {
      if (i.reason) {
        throw new Error(name_li[pos] + ": " + i.reason?.message);
      }
      ++pos;
    }
  };
};
