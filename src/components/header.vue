<template>
  <van-sticky @scroll="scroll" :offsetTop="offsetTop">
    <van-row class="top" type="flex" align="center" justify="center">
      <van-col span="6" class="logo">
        <router-link :to="{ name: 'tab', params: { id: 'all' } }">
          <img src="../assets/cnodejs_light.svg" />
        </router-link>
      </van-col>
      <van-col span="18">
        <van-search
          v-model="value"
          background="#333"
          placeholder="请输入搜索关键词"
        />
      </van-col>
      <!-- <van-col span="4">
      <van-button size="small" style="font-size: 0.3rem" color="#75b504"
        >按钮</van-button
      >
    </van-col> -->
    </van-row>
    <slot></slot>
  </van-sticky>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      value: "",
      offsetTop: -54, //设置顶部搜索栏吸附后默认隐藏
      scrollTop: 0, //上拉的距离默认为零
    };
  },
  methods: {
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
</style>
