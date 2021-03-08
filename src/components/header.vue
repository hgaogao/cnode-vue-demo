<template>
  <van-sticky @scroll="scroll" :offsetTop="offsetTop">
    <van-row class="top" type="flex" align="center" justify="center">
      <van-col span="6" class="logo">
        <router-link :to="{ name: 'tab', params: { id: 'all' } }">
          <img src="../assets/cnodejs_light.svg" />
        </router-link>
      </van-col>
      <van-col span="14">
        <van-search
          class="search"
          v-model="value"
          background="#333"
          placeholder="请输入搜索关键词"
        />
      </van-col>
      <van-col span="4">
        <div v-if="user.success">
          <img class="avatar" :src="user.avatar_url" alt="" />
        </div>
        <div v-else class="manager" @click="login">
          <van-icon name="user-circle-o" size="30" color="#ffffff" />
        </div>
      </van-col>
    </van-row>
    <slot></slot>
  </van-sticky>
</template>

<script>
import router from "../router";
import mixinUser from "../mixins/user";
export default {
  name: "Header",
  mixins: [mixinUser],
  data() {
    return {
      user: {},
      value: "",
      offsetTop: -54, //设置顶部搜索栏吸附后默认隐藏
      scrollTop: 0, //上拉的距离默认为零
    };
  },
  watch: {
    $route(to, from) {
      if (from.name == "login") {
        var user = this.getUserInfo();
        this.user = user;
      }
    },
  },
  created() {
    var user = this.getUserInfo();
    this.user = user;
  },

  methods: {
    login() {
      router.push({ name: "login" });
    },
    scroll(res) {
      var moveSize = this.scrollTop - res.scrollTop; //移动的距离
      var topMoveSize = this.offsetTop + moveSize; //搜索栏移动后的距离
      if (this.scrollTop > res.scrollTop) {
        //下拉
        if (topMoveSize < 0) {
          // 下拉之前判断搜索栏是否超出顶部
          this.offsetTop += moveSize;
        } else {
          this.offsetTop = 0;
        }
      } else {
        // 上拉
        if (topMoveSize < -55) {
          this.offsetTop = -55;
        } else {
          this.offsetTop += moveSize;
        }
      }
      // 最后更新上啦的距离
      this.scrollTop = res.scrollTop;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top {
  /* height: 54px; */
  background-color: #333;
  text-align: center;
}
.logo img {
  max-height: 1.5rem;
  margin-left: 10px;
}
.avatar {
  width: 35px;
  border-radius: 50%;
}
</style>
