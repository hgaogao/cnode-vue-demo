<template>
  <div>
    <user-info
      :img="articleData.author.avatar_url"
      :username="articleData.author.loginname"
      :date="articleData.create_at"
      :browse="articleData.visit_count"
      :comment="articleData.reply_count"
    />

    <div class="title">
      <h2>{{ articleData.title }}</h2>
      <div class="van-hairline--top-bottom"></div>
    </div>
    <div v-html="articleData.content" id="content"></div>
  </div>
</template>

<script>
import userInfo from "./userInfo.vue";
export default {
  components: { userInfo },
  name: "Article",
  props: ["articleData"],
  data() {
    return {};
  },
};
</script>

<style>
@import url("../assets/markdown-github.css");
</style>