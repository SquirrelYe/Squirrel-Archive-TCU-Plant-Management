const config = {
  log: true,
  info: true,
  error: true,
  warn: true,
  count: true,
};

module.exports = {
  //普通
  log(...arg) {
    if (config.log) return console.log(...arg);
  },
  //信息
  info(...arg) {
    if (config.info) return console.info(...arg);
  },
  //错误
  error(...arg) {
    if (config.error) return console.error(...arg);
  },
  //警告
  warn(...arg) {
    if (config.warn) return console.warn(...arg);
  },
  //计数
  count(...arg) {
    if (config.count) return console.count(...arg);
  },
};
