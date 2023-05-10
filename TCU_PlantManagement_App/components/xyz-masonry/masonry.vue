<template>
  <view class="masonry" style="">
    <view style="display: none">
      <image
        @load="loadImg"
        v-for="(item, index) in masonryList"
        :key="index"
        :data-id="item.id"
        :data-url="item.img_path"
        :src="item.img_path"
      ></image>
    </view>
    <view class="flex">
      <view>
        <image
          v-for="(item, index) in imgLeft"
          :key="index"
          :src="item.src"
          :mode="mode"
          :style="{ width: imgWidth + 'rpx' }"
          @click="goNavigate(item.id)"
          lazy-load
        ></image>
      </view>
      <view>
        <image
          v-for="(item, index) in imgRight"
          :key="index"
          :src="item.src"
          :mode="mode"
          :style="{ width: imgWidth + 'rpx' }"
          @click="goNavigate(item.id)"
          lazy-load
        ></image>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: "widthFix", //若给定图片宽高，设置scaleToFill
    },
    imgWidth: {
      type: Number,
      default: 340, //若给定图片宽高，设置scaleToFill
    },
    arrList: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      masonryList: this.arrList,
      imgLeft: [], //左侧图片列表
      imgRight: [], //右侧图片列表
      leftHeight: 0, //左侧高度
      rightHeight: 0, //右侧高度
    };
  },
  watch: {},
  methods: {
    goNavigate(id) {
      uni.navigateTo({
        url: "/pages/showWorks/showWorks?id=" + id,
        success: (res) => {},
        fail: () => {},
        complete: () => {},
      });
    },
    loadImg(e) {
      // console.log(e);
      let imgHeight = uni.upx2px(e.detail.height);
      //左侧<=右侧高度
      if (
        this.leftHeight == this.rightHeight ||
        this.leftHeight < this.rightHeight
      ) {
        let obj = {
          id: e.target.dataset.id,
          src: e.target.dataset.url,
        };
        this.leftHeight = this.leftHeight + imgHeight;
        this.imgLeft.push(obj);

        //左侧>右侧高度
      } else if (this.leftHeight > this.rightHeight) {
        let obj = {
          id: e.target.dataset.id,
          src: e.target.dataset.url,
        };
        this.rightHeight = this.rightHeight + imgHeight;
        this.imgRight.push(obj);
      }
    },
  },
  onLoad() {},
};
</script>

<style lang="less">
.masonry {
  .flex {
    > view {
      width: 340px;
      &:first-child {
        margin-right: 22px;
      }
      image {
        border-radius: 15px;
        margin-bottom: 16px;
        will-change: transform;
      }
    }
  }
}
</style>
