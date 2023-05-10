<template>
  <div>
    <input type="file" @change="uploads" />
    <img :src="filename" />
    <input v-model="filename" />
    <h3>{{ la }}</h3>
  </div>
</template>

<script>
import app from "../../App.vue";
export default {
  data() {
    return {
      imgUrl: "",
      filename: "",
      la: "",
    };
  },
  mounted() {
    this.la = app.data().name;
  },
  methods: {
    uploads(e) {
      const file = e.target.files[0]; //获取到当前文件对象

      let URL = window.URL || window.webkitURL; // 与上传没有关系（可选）
      this.imgUrl = URL.createObjectURL(file); // 这是为了显示图片而已， 与上传没有关系（可选）

      // 传递一个 FormData 对象 即可
      let formData = new FormData();
      formData.append("file", file); // 'file' 可变 相当于 input 表单的name 属性
      // 服务器只需按照正常的上传程序代码即可
      this.$http
        .post("/api/UploadServlet", formData)
        .then((res) => {
          console.log(res.data);
          this.filename = `/api/${res.data.filename}`;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
