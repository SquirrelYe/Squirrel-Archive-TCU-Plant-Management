const axios = require("axios");
const print = require("./print");
const jwt = require("jsonwebtoken");
const store = require("../vuex/index");
const alert = require("./alert");

// 请求超时时间
axios.defaults.timeout = 5000;
// post请求头
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = store.default.state.token || "-1";

    config.headers = { token };
    return config;
  },
  (error) => {
    print.log("请求拦截器", error);
    return Promise.error(error);
  }
);
// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.status === 200) return Promise.resolve(response);
    else {
      switch (response.status) {
        case 250:
          alert.Warning("强制下线", "用户在另一地登录");
          toLogin();
          break;
      }
    }
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 250:
          alert.Warning("强制下线", "用户在另一地登录");
          toLogin();
          break;
        case 430:
          alert.Warning("数据解密失败", "请检查密钥");
          break;
        case 431:
          alert.Timer("token失效，请重新登录", "自动回退登录界面");
          toLogin();
          break;
        case 432:
          alert.Warning("登录校验失败", "账号或密码错误");
          break;
        case 504:
          alert.Warning("请求超时", "请检查网络或系统情况");
          break;
      }
      // 返回接口返回的错误信息
      return Promise.reject(error.response.data);
    } else {
      alert.Warning("请求错误", error);
      print.log("响应拦截器", error);
    }
  }
);

// 返回登录界面，注销用户
function toLogin() {
  localStorage.clear();
  window.location.href = "/";
}
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get_Param(url, param) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: param })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        print.error(err);
      });
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function postParam(url, param) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, param)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        print.error(err);
      });
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} form [上传的文件]
 * @param {Object} obj [设置post—config]
 */
export function post(url, form, obj) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, form, obj)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
