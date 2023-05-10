<template>
  <view class="content" @click="scanQr()">
    <image class="logo" src="/static/logo.png"></image>
    <button
      class="getinfo"
      open-type="getUserInfo"
      v-if="isShow"
      @getuserinfo="bindGetUserInfo"
    >
      点我登录喔^_^
    </button>
    <view class="text-area" v-else>
      <text class="title">{{ title }}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      canIUse: uni.canIUse("button.open-type.getUserInfo"),
      title: "扫描二维码",
      userinfo: null,
      isShow: false,
    };
  },
  async onLoad() {
    let that = this;
    // 加载首页配置
    let index = await this.$apis.index.find();
    console.log(index.data.ok);
    this.isShow = index.data.ok;
    // 查看是否授权
    uni.getSetting({
      success(res) {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo);
              that.userinfo = res.userInfo;
              // 解除限制
              that.isShow = false;
            },
          });
        }
      },
    });
  },
  methods: {
    // 扫描二维码
    async scanQr() {
      if (!this.userinfo && this.isShow) {
        this.$api.msg("没有登录喔~");
        return;
      }
      let that = this;
      uni.scanCode({
        success(res) {
          console.log(res);
          let info = res.result;
          try {
            let tree = JSON.parse(info);
            if (tree.type === "tcu_tree") {
              // 跳转详情
              uni.navigateTo({
                url: "../list/list?info=" + info,
              });
            } else {
              that.$api.msg("二维码我不认识喔~");
            }
          } catch (e) {
            //TODO handle the exception
            that.$api.msg("扫描识别不了喔~");
          }
        },
        fail() {
          that.$api.msg("扫描失败喔~");
        },
      });
    },
    // 获取用户信息
    async bindGetUserInfo(e) {
      console.log(e.detail);
      if (!e.detail.userInfo) {
        this.$api.msg("不能拒绝我喔~");
      } else {
        let info = e.detail.userInfo;
        this.userinfo = info;
        // 解除限制
        this.isShow = false;
        // 上传用户信息
        let upinfo = await this.$apis.info.create(info);
        console.log("upinfo", upinfo);
      }
    },
  },
};
</script>

<style>
page {
  background-color: white;
}
button::after {
  border: none;
  outline: none;
  /* background-color: #ffffff; */
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}

.getinfo {
  font-size: 36rpx;
  color: #8f8f94;
  border: 0;
}
</style>
