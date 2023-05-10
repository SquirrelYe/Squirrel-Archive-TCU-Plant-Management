import Request from "./request";
import conf from "../config";

export const req = new Request();
/* 设置全局配置 */
req.setConfig((config) => {
  config.baseUrl = conf.host;
  config.header = {
    edition: conf.edition, // 请求头添加 应用版本信息
  };
  return config;
});
/* 请求之前拦截器 */
req.interceptor.request((config) => {
  config.header = {
    ...config.header,
  };
  return config;
});
/* 请求之后拦截器 */
req.interceptor.response((response) => {
  return response;
});

export default { req };
