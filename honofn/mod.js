export default (func) => async (c) => {
  let r;
  try {
    r = await func.call(c);
  } catch (err) {
    console.error(err);
    c.status(500);
    r = err.toString();
  }

  if (r) {
    if (r.constructor === String) {
      r = c.text(r);
    }
  } else {
    r = c.text("");
  }

  return r;
};
