<template>
  <div>
    <div class="wrapper-page">
      <div class="panel panel-color panel-primary panel-pages">
        <div class="panel-heading bg-img">
          <div class="bg-overlay"></div>
          <h3 class="text-center m-t-10 text-white">天津城建大学</h3>
          <br />
          <h3 class="text-center text-white" style="font-size: 30px">
            校园植物信息管理系统
          </h3>
        </div>

        <div class="panel-body">
          <div class="form-horizontal m-t-20">
            <div class="form-group">
              <div class="col-xs-12">
                <input
                  class="form-control input-lg"
                  type="text"
                  required=""
                  placeholder="学号"
                  v-model="sid"
                  v-on:keyup.enter="login()"
                />
              </div>
            </div>

            <div class="form-group">
              <div class="col-xs-12">
                <input
                  class="form-control input-lg"
                  type="password"
                  required=""
                  placeholder="密码"
                  v-model="pass"
                  v-on:keyup.enter="login()"
                />
              </div>
            </div>

            <div class="form-group">
              <div class="col-xs-12">
                <div class="checkbox checkbox-primary">
                  <input id="checkbox-signup" type="checkbox" v-model="check" />
                  <label for="checkbox-signup"> 记住我 </label>
                </div>
              </div>
            </div>

            <div class="form-group text-center m-t-40">
              <div class="col-xs-12">
                <button
                  class="btn btn-primary btn-lg w-lg waves-effect waves-light"
                  @click="login()"
                >
                  登录
                </button>
              </div>
            </div>

            <div class="form-group m-t-30">
              <div class="col-sm-7">
                <a href="/#/recoverypw"
                  ><i class="fa fa-lock m-r-5"></i> 忘记密码？</a
                >
              </div>
              <div class="col-sm-5 text-right">
                <a href="/#/register">创建新用户</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const cookie = require("../utils/cookie");
const s_alert = require("../utils/alert");
const ses = require("../utils/ses");
const print = require("../utils/print");
const apis = require("../interface/apis").default;

import { mapMutations } from "vuex";

export default {
  name: "login",
  data() {
    return {
      sid: null,
      pass: null,
      check: true,
    };
  },
  methods: {
    ...mapMutations(["LOGIN"]),
    login() {
      if (this.sid == null || this.pass == null) {
        s_alert.basic("用户名或密码为空");
        return;
      } else {
        apis.user.login(this.sid, this.pass).then((res) => {
          if (res) {
            print.log(res.data);
            if (res.data.type === 1) {
              let token = res.data.token || "token";
              localStorage.setItem("token", token); //存储token
              localStorage.setItem("user", JSON.stringify(res.data)); //存储 userinfo
              localStorage.setItem("isLogin", 1); //存储 userinfo
              this.LOGIN({
                token: token,
                userinfo: res.data,
              });
              s_alert.Success(
                "登录成功！",
                "现在可以对系统进行设置",
                "success"
              );
              this.$router.push("/menu/index");
            } else {
              s_alert.Success(
                "没有权限进入！",
                "此系统仅限管理员能操作",
                "warning"
              );
            }
          } else {
            s_alert.Success("用户名或密码错误！", "请检查后重试", "warning");
          }
        });
      }
    },
  },
};
</script>

<style scoped></style>
