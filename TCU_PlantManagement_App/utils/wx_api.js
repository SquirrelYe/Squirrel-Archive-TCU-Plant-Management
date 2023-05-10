const http = require("./req/index");
let req = http.req;

// 获取openid   res 为 wx.login 接口调用获取的值
const getOpenid = (res) => {
  return req.post("/wx/wx", {
    judge: "0",
    appid: "wxb3fd8ad18721c52b",
    secret: "b747f61e67542058243d4e0af189d2bc",
    js_code: res.code,
    grant_type: "authorization_code",
  });
};

// 获取access_taken
const getAccessTaken = () => {
  return req.post("/wx/wx", {
    judge: "1",
    appid: "wxb3fd8ad18721c52b",
    secret: "b747f61e67542058243d4e0af189d2bc",
  });
};

module.exports = {
  getOpenid,
  getAccessTaken,
};
