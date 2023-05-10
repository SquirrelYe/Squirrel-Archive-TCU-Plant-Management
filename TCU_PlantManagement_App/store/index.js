import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    hasLogin: uni.getStorageSync("hasLogin") || false,
    user: uni.getStorageSync("user") || {},
    userInfo: uni.getStorageSync("userInfo") || {},
    token: uni.getStorageSync("token") || "",
    isAuthen: uni.getStorageSync("isAuthen") || false,
  },
  mutations: {
    getInfo(state, info) {
      state.userInfo = info;
      uni.setStorage({ key: "userInfo", data: info });
    },
    login(state, obj) {
      state.hasLogin = true;
      state.userInfo = obj.userinfo;
      state.user = obj.user;
      state.token = obj.token;
      //缓存用户登陆状态
      uni.setStorage({ key: "userInfo", data: obj.userinfo });
      uni.setStorage({ key: "hasLogin", data: true });
      uni.setStorage({ key: "token", data: obj.token });
      uni.setStorage({ key: "user", data: obj.user });
      // console.log(state.userInfo, state.hasLogin, state.token, state.user);
    },
    logout(state) {
      state.hasLogin = false;
      state.userInfo = {};
      state.token = null;
      state.user = {};
      uni.removeStorage({ key: "userInfo" });
      uni.removeStorage({ key: "hasLogin" });
      uni.removeStorage({ key: "token" });
      uni.removeStorage({ key: "user" });
    },
    reLogin(state, obj) {
      console.log("reLogin......", obj);
      state.hasLogin = true;
      state.user = obj.user;
      state.token = obj.token;
      //缓存用户登陆状态
      uni.setStorage({ key: "hasLogin", data: true });
      uni.setStorage({ key: "token", data: obj.token });
      uni.setStorage({ key: "user", data: obj.user });
    },
    ToAuthen(state) {
      (state.isAuthen = true), uni.setStorage({ key: "isAuthen", data: true });
    },
    delAuthen(state) {
      (state.isAuthen = false),
        uni.setStorage({ key: "isAuthen", data: false });
    },
  },
  actions: {},
});

export default store;
