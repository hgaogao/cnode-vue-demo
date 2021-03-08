<template>
  <div>
    <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="conter">
      <van-form @submit="onSubmit">
        <van-field
          v-model="accesstoken"
          name="accesstoken"
          label="accesstoken"
          placeholder="accesstoken"
          :rules="[{ required: true, message: '请填accesstoken' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
      <a href="https://cnodejs.org/signin">点击这里，登录然后获取accesstoken</a>
    </div>
  </div>
</template>

<script>
import router from "../router";
import mixinUser from "../mixins/user";
export default {
  name: "Login",
  mixins: [mixinUser],
  data() {
    return {
      accesstoken: "",
    };
  },
  //   为什么会失效？？
  watch: {
    $route(to, from) {
      console.log(to);
      console.log(from);
    },
  },

  methods: {
    onClickLeft() {
      history.back();
    },
    onSubmit(values) {
      this.$api.user.login(values.accesstoken).then((res) => {
        console.log(res);
        if (res.success) {
          this.setToken(values.accesstoken); //保存token到浏览器
          this.setUserInfo(res);
          this.$toast("登录成功");
          router.back();
        } else {
          this.accesstoken = "";
          this.$toast("accesstoken错误🙅");
        }
      });
    },
  },
};
</script>

<style scoped>
.conter {
  height: 200px;
  padding: 0 20px;
  margin: 200px auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>