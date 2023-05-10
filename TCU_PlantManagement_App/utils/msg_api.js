const http = require("./req/index");
let req = http.req;

// const testUrl = 'https://www.yexuan.site/logistics/wx_api'

// 获取openid   res 为 wx.login 接口调用获取的值
const sendRegisterCode = (phone, code) => {
  return req.post("/msg/msg", {
    judge: 0,
    phone: phone,
    code: code,
  });
};

module.exports = {
  sendRegisterCode,
};
