const s_alert = require("../utils/alert");
// 分页
function nextPage() {
  if (this.currentPage * this.limit >= this.showItem.count)
    s_alert.basic("已经到达最后一页了");
  else {
    this.currentPage++;
    this.offsize += 10;
    this.init();
  }
}
function previousPage() {
  if (this.currentPage == 1) s_alert.basic("已经到达最前一页了");
  else {
    this.currentPage--;
    this.offsize -= 10;
    this.init();
  }
}

module.exports = {
  nextPage,
  previousPage,
};
