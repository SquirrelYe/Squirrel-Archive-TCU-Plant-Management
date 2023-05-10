<template>
  <div>
    <!-- coding... -->
    <div class="wrapper-page">
      <div class="panel panel-color panel-primary panel-pages">
        <div class="panel-heading bg-img">
          <div class="bg-overlay"></div>
          <h3 class="text-center m-t-10 text-white">重置密码</h3>
        </div>

        <div class="panel-body">
          <div class="form-horizontal m-t-20">
            <div class="form-group">
              <div class="col-xs-12">
                <input
                  class="form-control input-lg"
                  type="text"
                  required=""
                  placeholder="请输入新密码"
                  v-model="passWord1"
                />
              </div>
            </div>

            <div class="form-group">
              <div class="col-xs-12">
                <input
                  class="form-control input-lg"
                  type="text"
                  required=""
                  placeholder="再次输入新密码"
                  v-model="repassWord"
                />
              </div>
            </div>

            <div class="form-group text-center m-t-40">
              <div class="col-xs-12">
                <button
                  class="btn btn-primary waves-effect waves-light btn-lg w-lg"
                  @click="compare2pwd()"
                >
                  重置
                </button>
              </div>
            </div>

            <div class="form-group m-t-30">
              <div class="col-sm-12 text-center">
                <a href="/">返回登录</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <h3>{{email}}</h3> -->
  </div>
</template>

<script>
const s_alert = require("../utils/alert");
import app from "../App.vue";

export default {
  name: "resetpwd",
  data() {
    return {
      passWord1: "",
      repassWord: "",
      email: "",
    };
  },
  mounted() {
    //xxx
  },
  beforeRouteEnter(to, from, next) {
    var mail = JSON.stringify(to.params.id);
    next((vm) => {
      vm.setmail(mail);
    });
  },
  methods: {
    setmail(mail) {
      this.email = mail;
    },
    //点击重置按钮，进行逻辑操作
    reset() {
      //重置密码
      var that = this;
      that
        .axios({
          method: "post",
          url: `${app.data().globleUrl}/users?judge=4&password=${
            that.repassWord
          }&email=${that.email}`,
        })
        .then((res) => {
          console.log(res.data);
          if (JSON.stringify(res.data.affectedRows) == 1) {
            s_alert.Success("密码重置成功", "正在返回登录界面……", "success");
            setTimeout(function () {
              that.$router.push("/");
            }, 3000);
          }
        })
        .catch((error) => console.log(error));
    },

    //邮箱输入框 失去焦点 进行邮箱验证
    compare2pwd() {
      console.log(this.passWord1, this.repassWord);
      if (this.passWord1 == this.repassWord) {
        s_alert.basic("密码验证通过");
        var that = this;
        setTimeout(function () {
          that.reset();
        }, 3000);
      } else {
        s_alert.basic("两次输入的密码不一致！");
      }
    },
  },
};
</script>

<style scoped></style>
