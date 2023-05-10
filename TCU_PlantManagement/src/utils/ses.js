const ses = window.sessionStorage;

module.exports = {
  //设置sessionStorage
  setSessionStorage(key, value) {
    ses.setItem(key, value);
  },
  //读取sessionStorage
  getSessionStorage(key) {
    return ses.getItem(key);
  },
  //清除sessionStorage
  clearOneSessionStorageByKey(key) {
    ses.removeItem(key);
  },
  //清除所有sessionStorage
  clearAllSessionStorage() {
    ses.clear();
  },
};
