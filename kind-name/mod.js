export default (kind, name) => {
  if (name) {
    kind += " " + name;
  }
  return kind;
};
