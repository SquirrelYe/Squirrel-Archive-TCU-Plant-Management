// 利用对象展开运算符，解构
function formatTime(x) {
  if (!x) return "";
  else return moment(x).format("YYYY-MM-DD HH:mm:ss");
}
function formatCondition(x) {
  if (x == 0) return "正常";
  if (x == -1) return "冻结";
}
function formatGender(x) {
  if (x == 0) return "未知";
  if (x == 1) return "男";
  if (x == 2) return "女";
}

module.exports = {
  formatTime,
  formatCondition,
  formatGender,
};
