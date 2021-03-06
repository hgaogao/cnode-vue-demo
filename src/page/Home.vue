<template>
  <div>
    <!-- <div v-if="!load">
      <img class="img" src="../assets/cnodejs_light.svg" alt="" />
    </div> -->
    <!-- <div v-show="load"> -->
      <Header> <tabs /></Header>
      <post-list :id="id" @loading="loading" />
      <suspension
        :backShow="false"
        position="bottom"
        :_style="{
          height: '30%',
        }"
        :round="true"
      ></suspension>
    </div>
  <!-- </div> -->
</template>

<script>
import suspension from "@/components/suspension.vue";
import Header from "@/components/header.vue";
import PostList from "@/components/postlist.vue";
import tabs from "@/components/tabs.vue";
export default {
  name: "Home",
  components: {
    Header,
    tabs,
    PostList,
    suspension,
  },
  data() {
    return {
      id: "",
      load: false,
    };
  },

  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next((vm) => {
      vm.setId(to.params.id);
    });
  },
  methods: {
    loading(val) {
      this.loading = val;
      console.log(val);
    },
    setId(id) {
      this.id = id;
    },
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    this.setId(to.params.id);

    next();
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    next();
  },
};
</script>

<style scoped>
.img {
  text-align: center; /*让div内部文字居中*/
  background-color: #222;
  padding: 10px;
  border-radius: 5px;
  width: 150px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>