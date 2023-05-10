export default class Request {
  constructor(arg) {
    this.request(arg);
  }
  config = {
    baseUrl: "",
    header: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    method: "GET",
    dataType: "json",
    responseType: "text",
    success() {},
    fail() {},
    complete() {},
  };
  /* 判断url是否为绝对路径 */
  static posUrl(url) {
    return /(http|https):\/\/([\w.]+\/?)\S*/.test(url);
  }
  interceptor = {
    request(f) {
      if (f) {
        Request.requestBeforeFun = f;
      }
    },
    response(f) {
      if (f) {
        Request.requestComFun = f;
      }
    },
  };
  static requestBeforeFun(config) {
    return config;
  }
  static requestComFun(response) {
    return response;
  }
  setConfig(f) {
    this.config = f(this.config);
  }

  request(options = {}) {
    options.baseUrl = options.baseUrl || this.config.baseUrl;
    options.dataType = options.dataType || this.config.dataType;
    options.url = Request.posUrl(options.url)
      ? options.url
      : options.baseUrl + options.url;
    (options.data = options.data || {}),
      (options.header = options.header || this.config.header);
    options.method = options.method || this.config.method;
    return new Promise((resolve, reject) => {
      let _config = null;

      options.complete = (response) => {
        let statusCode = response.statusCode;
        response.config = _config;
        response = Request.requestComFun(response);
        // 成功
        if (statusCode === 200) {
          resolve(response);
        }
        // 失败
        else {
          reject(response);
        }
      };
      let afC = { ...this.config, ...options };
      _config = { ...afC, ...Request.requestBeforeFun(afC) };
      uni.request(_config);
    });
  }
  // GET 请求
  get(url, data, options = {}) {
    options.url = url;
    options.data = data;
    options.method = "GET";
    return this.request(options);
  }
  // POST 请求
  post(url, data, options = {}) {
    console.log("post 请求地址", url);
    options.url = url;
    options.data = data;
    options.method = "POST";
    return this.request(options);
  }
}
