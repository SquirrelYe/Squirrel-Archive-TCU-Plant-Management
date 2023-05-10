import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || "",
    userinfo: localStorage.getItem("userinfo") || "",
  },
  mutations: {
    LOGIN: (state, data) => {
      state.token = data.token;
      state.userinfo = data.userinfo;
    },
    LOGOUT: (state, data) => {
      state.token = "";
      state.userinfo = "";
      localStorage.clear();
    },
  },
});
export default store;
