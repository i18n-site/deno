export default (v) => {
  if (v) {
    v = v.toLowerCase();
    if (!["0", "false", "no", "off"].includes(v)) {
      return true;
    }
  }
  return false;
};
