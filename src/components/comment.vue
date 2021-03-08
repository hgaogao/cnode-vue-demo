
<template>
  <div>
    <van-divider dashed>评论</van-divider>
    <div v-if="commentList && commentList.length == 0">
      <van-divider dashed>没有评论</van-divider>
    </div>
    <div v-else>
      <div v-for="(item, index) in commentList" :key="index">
        <van-cell-group>
          <van-cell>
            <!-- <div class="avatar"><img :src="item.author.avatar_url" alt="" /></div>
          <div>{{ item.author.loginname }}</div> -->

            <div class="top">
              <user-info
                :img="item.author.avatar_url"
                :username="item.author.loginname"
                :date="item.create_at"
              />
              <div class="good">
                <van-icon
                  v-if="item.is_uped"
                  name="good-job"
                  @click="isGood(item.is_uped, index, item.id)"
                />
                <van-icon
                  v-else
                  name="good-job-o"
                  @click="isGood(item.is_uped, index, item.id)"
                />
                {{ item.ups.length }}
              </div>
            </div>

            <div v-html="item.content"></div
          ></van-cell>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
import userInfo from "./userInfo.vue";
import mixinUser from "../mixins/user";
export default {
  components: { userInfo },
  mixins: [mixinUser],
  name: "Comment",
  props: ["comments"],
  data() {
    return {
      commentList: [],
    };
  },
  watch: {
    comments(newArray) {
      this.commentList = newArray;
    },
  },
  methods: {
    isGood(good, index, id) {
      var token = this.getToken() || "";
      console.log(token);
      this.$api.user.fabulous(id, token);
      if (!good) {
        if (token !== "") {
          this.$toast("赞👍");
        }
        this.commentList[index].ups.push(token);
        this.commentList[index].is_uped = true;
      } else {
        if (token !== "") {
          this.$toast("取消👍");
        }
        this.commentList[index].ups.pop();
        this.commentList[index].is_uped = false;
      }
    },
  },
};
</script>

<style scoped>
.avatar img {
  width: 20px;
  border-radius: 50%;
}

.avatar .top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>