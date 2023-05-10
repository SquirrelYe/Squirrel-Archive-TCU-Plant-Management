<template>
  <body>
    <div class="wrapper-page">
      <div class="panel panel-color panel-primary panel-pages">
        <div class="panel-heading bg-img">
          <div class="bg-overlay"></div>
          <h3 class="text-center m-t-10 text-white">重置密码</h3>
        </div>

        <div class="panel-body">
          <div class="alert alert-info alert-dismissable">
            <button
              type="button"
              class="close"
              data-dismiss="alert"
              aria-hidden="true"
            >
              ×
            </button>
            输入 <b>你的邮箱</b> 将会给你发送一条验证消息
          </div>
          <div class="form-group m-b-0">
            <div class="input-group">
              <input
                type="email"
                class="form-control input-lg"
                placeholder="输入注册时的邮箱"
                required=""
                v-model="eMail"
              />
              <span class="input-group-btn">
                <button
                  class="btn btn-lg btn-primary waves-effect waves-light"
                  @click="sendcode()"
                >
                  验证
                </button>
              </span>
            </div>
            <input
              class="form-control input-lg"
              style="margin-top: 20px"
              placeholder="请输入验证码"
              v-if="sendCodeComplete && judge != code"
              v-model="judge"
              @input="judgeCode"
            />
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
const s_alert = require("../utils/alert");
import app from "../App.vue";

export default {
  name: "recoverypw",
  data() {
    return {
      eMail: "",
      sendCodeComplete: false,
      condition: "",
      code: "",
      judge: "",
    };
  },
  mounted() {
    //xxx
  },
  methods: {
    //发送验证信息
    sendcode() {
      if (this.eMail) {
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
      } else {
        s_alert.basic("不能输入空哦");
      }
    },
    //验证验证输入匹配？
    judgeCode(event) {
      var that = this;
      if (that.judge.indexOf(that.code) != -1) {
        s_alert.Success("验证成功", "正在加载……", "success");
        this.toResetPwd();
      }
    },
    //跳转重置密码
    toResetPwd() {
      this.$router.push({ path: `/resetpwd/${this.eMail}` });
    },
  },
};
</script>

<style scoped></style>
