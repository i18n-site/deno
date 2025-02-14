export default (sec) => {
  const minutes = Math.floor(sec / 60);
  if (minutes < 99) {
    return `${minutes} 分钟`;
  }

  const hours = Math.floor(sec / 3600);
  if (hours < 99) {
    return `${hours} 小时`;
  }

  return `${Math.floor(sec / 86400)} 天`;
};
