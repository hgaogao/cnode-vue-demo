<template>
  <div>
    <van-divider dashed>评论</van-divider>
    <div v-for="(item, index) in comments" :key="index">
      <van-cell-group>
        <van-cell>
          <!-- <div class="avatar"><img :src="item.author.avatar_url" alt="" /></div>
          <div>{{ item.author.loginname }}</div> -->

          <user-info :img="item.author.avatar_url" :username="item.author.loginname" :date="item.create_at"/>

          <div v-html="item.content"></div
        ></van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import userInfo from "./userInfo.vue";
export default {
  components: { userInfo },
  name: "Comment",
  props: ["comments"],
  watch: {
    comments(val, old) {
      console.log(val);
    },
  },
};
</script>

<style scoped>
.avatar img {
  width: 20px;
  border-radius: 50%;
}
</style>