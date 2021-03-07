<template>
  <div>
    <div v-if="load">
      <img class="img" src="../assets/cnodejs_light.svg" alt="" />
    </div>
    <div v-else>
      <Header> <tabs /></Header>
      <!-- <post-list :id="id" @loading="loading" /> -->
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          error-text="加载失败"
          :error.sync="error"
          @load="onLoad"
          :immediate-check="false"
        >
          <van-cell
            v-for="(item, index) in listData"
            :key="index"
            is-link
            :to="{ name: 'articlePage', params: { id: item.id } }"
          >
            <user-info
              :img="item.author.avatar_url"
              :username="item.author.loginname"
              :date="item.create_at"
              :browse="item.visit_count"
              :comment="item.reply_count"
            />
            <div class="title van-ellipsis">
              <span v-if="item.top" class="top tab">置顶</span>
              <span v-else :class="item.tab" class="tab">{{
                item.tab | tab
              }}</span
              >{{ item.title }}
            </div>
          </van-cell>
        </van-list>
      </van-pull-refresh>
      <suspension
        :backShow="false"
        position="bottom"
        :_style="{
          height: '30%',
        }"
        :round="true"
      ></suspension>
    </div>
  </div>
</template>

<script>
import suspension from "@/components/suspension.vue";
import Header from "@/components/header.vue";
import tabs from "@/components/tabs.vue";
import userInfo from "@/components/userInfo.vue";
export default {
  name: "Home",
  components: {
    Header,
    tabs,
    suspension,
    userInfo,
  },
  data() {
    return {
      id: "",
      load: true,
      PostList: [],
      loading: false,
      finished: false,
      refreshing: false,
      error: false,
      listData: [],
      page: 1,
      tabChange: "",
      tab: "",
    };
  },
  methods: {
    onLoad(id) {
      this.$api.topics
        .getTopics(id || this.id, this.page++, 10)
        .then((response) => {
          if (this.tabChange) {
          //合并拼接list数组
            this.listData = this.listData.concat(response.data);
          } else {
            // 判断是否为同一个列表，不同的列表重新替换数组
            this.listData = response.data;
            this.id = id;
            this.tabChange = true;
          }
          this.load = false;
          this.refreshing = false;
          this.loading = false;
        })
        .catch((error) => {
          this.refreshing = false;
          this.error = true;
          this.loading = false;
          console.log(error);
        });
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      this.page = 1;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      console.log("刷新" + this.id);
      this.onLoad(this.id);
    },
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next((vm) => {
      vm.onLoad(to.params.id);
    });
  },

  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    this.tabChange = false;
    this.page = 1;
    this.tab = to.params.id;
    console.log(this.tab);
    this.onLoad(to.params.id);

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
.avatar img {
  width: 20px;
  border-radius: 50%;
}
.title {
  font-size: 16px;
  font-weight: 700;
}
.tab {
  padding: 1px 4px;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
}
.share {
  background-color: #39af78;
}
.ask {
  background-color: #1282fa;
}
.all {
  background-color: #b8b8b8;
}
.good {
  background-color: #e84a5a;
}
.job {
  background-color: #30ddf0;
}
.top {
  background-color: red;
}
</style>