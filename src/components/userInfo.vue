<template>
  <div class="userinfo">
    <img :src="img" alt="" />
    <div class="left">
      <div class="username">{{ username }}</div>
      <div class="date">{{ date | formatDate }}<span v-if="browse">{{` ● ${browse}浏览 | ${comment}评论`}}</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  props: ["img", "username", "date","browse","comment"],
};
</script>

<style scoped>
.userinfo {
  display: flex;
  align-items: center;
}
img {
  border-radius: 50%;
  width: 40px;
  height: 40px;
}
.left {
  margin-left: 10px;
}
.username {
  font-size: 16px;
}
.date {
  color: #777;
  font-size: 12px;
}
</style>