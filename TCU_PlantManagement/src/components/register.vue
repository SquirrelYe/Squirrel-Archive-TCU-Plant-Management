<template>
  <div>
    <!-- coding... -->
    <div class="wrapper-page">
      <div class="panel panel-color panel-primary panel-pages">
        <div class="panel-heading bg-img">
          <div class="bg-overlay"></div>
          <h3 class="text-center m-t-10 text-white">创建新用户</h3>
        </div>

        <div class="panel-body">
          <div class="form-horizontal m-t-20">
            <div class="form-group">
              <div class="col-xs-12">
                <input
                  class="form-control input-lg"
                  type="text"
                  required=""
                  placeholder="用户名"
                  v-model="userName"
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
                  v-model="passWord"
                />
              </div>
            </div>

            <div class="form-group">
              <div class="col-xs-12">
                <input
                  class="form-control input-lg"
                  type="email"
                  required=""
                  placeholder="邮箱"
                  v-model="eMail"
                  @blur="sendcodeRegister()"
                />
              </div>
            </div>

            <div class="form-group" v-if="sendCodeComplete && judge != code">
              <div class="col-xs-12">
                <input
                  class="form-control input-lg"
                  type="text"
                  required=""
                  placeholder="验证码"
                  v-model="judge"
                  @input="judgeCode"
                />
              </div>
            </div>

            <div class="form-group">
              <div class="col-xs-12">
                <div class="checkbox checkbox-primary">
                  <input id="checkbox-signup" type="checkbox" v-model="check" />
                  <label for="checkbox-signup">
                    接受 <a href="#">天津城建大学 校园植物信息管理系统 条例</a>
                  </label>
                </div>
              </div>
            </div>

            <div class="form-group text-center m-t-40">
              <div class="col-xs-12">
                <button
                  class="btn btn-primary waves-effect waves-light btn-lg w-lg"
                  @click="register()"
                >
                  注册
                </button>
              </div>
            </div>

            <div class="form-group m-t-30">
              <div class="col-sm-12 text-center">
                <a href="/">已经拥有账号</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const s_alert = require("../utils/alert");
import app from "../App.vue";

export default {
  name: "register",
  data() {
    return {
      content: "",
      userName: "",
      passWord: "",
      eMail: "",
      judge: "",
      code: "",
      check: true,
      sendCodeComplete: false,
    };
  },
  mounted() {
    //xxx
  },
  methods: {
    //点击注册按钮，进行逻辑操作
    register() {
      if (this.userName == "" || this.passWord == "" || this.eMail == "") {
        s_alert.basic("不能有空哦");
      } else {
        if (this.check) {
          if (this.judge == this.code) {
            //判断验证码是否验证
            this.axios({
              method: "post",
              url: `${app.data().globleUrl}/users?judge=2&username=${
                this.userName
              }&password=${this.passWord}&email=${this.eMail}`,
            })
              .then((res) => {
                if (JSON.stringify(res.data.affectedRows) == 1) {
                  s_alert.Success("注册成功", "正在加载……", "success");
                  this.$router.push("/");
                }
              })
              .catch((error) => console.log(error));
          } else {
            s_alert.basic("验证码验证失败！");
          }
        } else {
          s_alert.basic("必须接受 天津城建大学 校园植物信息管理系统 条例");
        }
      }
    },
    //邮箱输入框 失去焦点 进行邮箱验证
    sendcodeRegister() {
      if (this.eMail) {
        this.judgeFirst();
      } else {
        s_alert.basic("邮箱不能输入空哦");
      }
    },
    //检查邮箱是否第一次使用来注册
    judgeFirst() {
      var that = this;
      this.axios({
        method: "post",
        url: `${app.data().globleUrl}/users?judge=3&email=${this.eMail}`,
      })
        .then((res) => {
          var jf = JSON.stringify(res.data.success);
          if (jf.indexOf("true") != -1) {
            s_alert.basic("验证第一次注册成功！");
            this.sendcode(); //验证成功，发送验证信息
          } else if (jf.indexOf("oversize") != -1) {
            s_alert.basic("此邮箱已经被使用过啦！");
          } else {
            s_alert.basic("验证第一次注册失败！");
          }
        })
        .catch((error) => console.log(error));
    },
    //发送验证信息
    sendcode() {
      var num = "";
      for (var i = 0; i < 6; i++) {
        num += Math.floor(Math.random() * 10);
      }
      this.code = num;
      var that = this;
      s_alert.basic("发送中……");
      this.axios({
        method: "post",
        url: `${app.data().globleUrl}/mail?judge=0&mail_address=${
          this.eMail
        }&code=${num}`,
      })
        .then((res) => {
          that.condition = JSON.stringify(res.data.success);
          if (that.condition.indexOf("true") != -1) {
            s_alert.Success("发送成功", "正在加载……", "success");
            that.sendCodeComplete = true;
            //that.$router.push('/')
          } else {
            s_alert.basic("发送失败");
          }
        })
        .catch((error) => console.log(error));
    },
    //验证输入验证码是否正确
    judgeCode(event) {
      var that = this;
      if (that.judge.indexOf(that.code) != -1) {
        s_alert.Success("验证成功", "正在加载……", "success");
      }
    },
  },
};
</script>

<style scoped></style>
