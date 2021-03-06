<template>
  <div class="suspension">
    <div v-show="backTopShow" class="popup" @click="backTop">
      <van-icon size="25" name="back-top" />
    </div>
    <div v-show="backShow" class="popup" @click="back">
      <van-icon size="25" name="revoke" />
    </div>
    <div class="popup" @click="showPopup">
      <van-icon size="30" name="add-o" />
    </div>
    <van-popup
      v-model="show"
      :round="round"
      :position="position"
      :style="_style"
      closeable
      ><slot></slot
    ></van-popup>
  </div>
</template>

<script>
export default {
  name: "Supension",
  props: {
    backShow: Boolean,
    position: String,
    round: Boolean,
    _style: Object,
  },
  data() {
    return {
      show: false,
      backTopShow: false,
    };
  },

  methods: {
    back() {
      history.back();
    },
    showIcon() {
      if (
        !!document.documentElement.scrollTop &&
        document.documentElement.scrollTop > 200
      ) {
        // 页面高度大于200执行操作;
        this.backTopShow = true;
      } else {
        // 页面高度小于200执行操作;
        this.backTopShow = false;
      }
    },
    backTop() {
      scrollTo(0, 0);
    },
    showPopup() {
      this.show = true;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.showIcon);
  },
  watch: {
    // 监听路由变化，路由变化就关闭弹窗
    backShow(newVal, Old) {
      console.log(newVal);
    },
    $route(to) {
      this.show = false;
    },
  },
};
</script>

<style>
.suspension {
  position: fixed;
  bottom: 50px;
  right: 10px;
}
.popup {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #39af78;
  color: #fff;
  margin-top: 10px;
}
</style>