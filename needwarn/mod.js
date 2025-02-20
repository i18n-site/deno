export default (diff, warn) => {
  if (diff < 600) {
    return warn < 1;
  }

  if (diff < 3600) {
    return warn < 2;
  }

  if (diff < 86400) {
    return warn < 3;
  }

  return warn - 2 < diff / 86400;
};
