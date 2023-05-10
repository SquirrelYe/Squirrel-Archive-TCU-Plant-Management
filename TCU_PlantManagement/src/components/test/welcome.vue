<template>
  <div>
    <h2>welcome</h2>
    <h3>{{ content }}</h3>
    <button @click="logout()">注销</button>
    <button class="btn-success" @click="mockcs()">测试mockjs</button>
  </div>
</template>

<script>
export default {
  name: "welcome",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    var s = window.sessionStorage.data;
    this.content = s;
    if (window.sessionStorage.data == null) {
      alert("登录回话过期，请重新登录！");
      this.$router.push("/");
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (window.sessionStorage.data) {
      next();
    } else {
      alert("登录回话过期，请重新登录！");
      next("/");
    }
  },
  methods: {
    logout() {
      window.sessionStorage.removeItem("data");
      alert("注销成功！");
      window.location.reload();
    },
    mockcs() {
      this.axios
        .post("/news/api", { withCredentials: true })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
