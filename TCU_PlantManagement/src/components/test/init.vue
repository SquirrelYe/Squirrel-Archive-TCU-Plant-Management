<template>
  <div class="hello">
    <button class="btn btn-primary" @click="show">测试</button>
    <pre>{{ content }}</pre>
  </div>
</template>

<script>
export default {
  name: "init",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    this.axios.post("http://api.komavideo.com/news/list").then((body) => {
      this.content = body.data;
    });
  },
  methods: {
    show: function () {
      alert(JSON.stringify(this.content[0].title));
    },
  },
};
</script>

<style scoped></style>
