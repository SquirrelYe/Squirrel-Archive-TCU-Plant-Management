<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <h5>几种router的传递方式</h5>
    <router-link to="/init">Home</router-link>
    <router-link to="/login/1">login</router-link>
    <a @click="router('router')">router</a>
    <router-link :to="{ name: 'login', params: { id: 'to_name' }}">to_name</router-link>
    <router-link :to="{ path: '/login/path' }">path</router-link>
    <hr>
    <router-link to="profile">简介</router-link> -->
    <router-view />
  </div>
</template>

<script>
// import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/core.css";
import "./assets/css/icons.css";
import "./assets/css/components.css";
import "./assets/css/pages.css";
import "./assets/css/menu.css";
import "./assets/css/responsive.css";
import "../static/plugins/sweetalert/dist/sweetalert.css";
import "../static/plugins/magnific-popup/dist/magnific-popup.css";
import "../static/plugins/jquery-datatables-editable/datatables.css";

export default {
  name: "App",
  data() {
    return {
      globleUrl: "http://localhost:11111",
      name: "yexuan",
    };
  },
  //页面加载调用获取cookie值
  mounted() {
    //this.getCookie();
  },
  methods: {
    show: function () {
      alert("测试APP.VUE...");
    },
    router(uid) {
      this.$router.push({ path: `/login/${uid}` });
    },
    setGlobleUrlq(url) {
      //console.log('-->',url)
      this.globleUrl = url;
      console.log(this.globleUrl);
      return this.globleUrl;
    },
  },
  components: {
    remote: {
      render: function (createElement) {
        var self = this;
        return createElement("script", {
          attrs: {
            type: "text/javascript",
            src: this.src,
          },
        });
      },
      props: {
        src: {
          type: String,
          required: true,
        },
      },
    },
  },
  // beforeRouteUpdate(to, from, next) {
  //     next();
  // }
};
</script>

<style>
.cs {
  margin-top: 10px;
  background-color: black;
  height: 20px;
}
</style>
