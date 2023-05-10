const http = require("./req/index");
let req = http.req;
export default {
  test: {
    test() {
      return req.post("/test", {});
    },
  },
  // 档案清单
  list: {
    findById(id) {
      return req.post("/ass/list", { judge: 1, id: id });
    },
  },
  // 用户信息
  info: {
    create(data) {
      return req.post("/ent/info", { judge: 1, ...data });
    },
  },
  // 首页配置
  index: {
    find() {
      return req.post("/index");
    },
  },
};
