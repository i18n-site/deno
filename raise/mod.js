import { dump } from "@8v/yml";

export default (cls) => {
  const raise = (...args) => {
    const args_len = args.length;

    if (args_len == 0) {
      return;
    }

    if (args_len == 1 && Array.isArray(args[0])) {
      raise(...args[0]);
      return;
    }

    const li = [];

    for (let i of args) {
      const len = li.length;
      if (i.constructor != String) {
        i = dump(i).trimEnd();
        if (len) {
          i = "\n" + i;
        }
      } else {
        i = i.trim();
        if (len && i.length + li.at(-1).length > 32) {
          i = "\n" + i;
        }
      }
      li.push(i);
    }

    throw new cls(li.join(" "));
  };
  return raise;
};
