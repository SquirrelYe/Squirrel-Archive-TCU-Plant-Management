import Vue from "vue";
import App from "./App";

import regex from "./utils/regex/regex";
import apis from "./utils/apis";
import wx_api from "./utils/wx_api";
import msg_api from "./utils/msg_api";
import conf from "./utils/config.js";

//统一提示方便全局修改
const msg = (title, duration = 1500, mask = false, icon = "none") => {
  if (Boolean(title) === false) {
    return;
  }
  uni.showToast({
    title,
    duration,
    mask,
    icon,
  });
};
//模拟异步请求数据
const json = (type) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Json[type]);
    }, 500);
  });
};
// 返回
const prePage = () => {
  let pages = getCurrentPages();
  let prePage = pages[pages.length - 2];
  // #ifdef H5
  return prePage;
  // #endif
  return prePage.$vm;
};

Vue.config.productionTip = false;
Vue.prototype.$edition = conf.edition;
Vue.prototype.$fire = new Vue();
Vue.prototype.$api = { msg, json, prePage };
Vue.prototype.$regex = regex;
Vue.prototype.$apis = apis;
Vue.prototype.$wx_api = wx_api;
Vue.prototype.$msg_api = msg_api;
// 全局host
Vue.prototype.$host = conf.host;

App.mpType = "app";

const app = new Vue({
  ...App,
});
app.$mount();
