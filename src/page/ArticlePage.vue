<template>
  <div>
    <Header />
    <div class="article">
      <div v-if="loging">
        <van-skeleton title :row="10" />
      </div>
      <div v-else>
        <!-- 正文 -->
        <Article :articleData="articleData" />
      </div>

      <!-- 评论区 -->
      <Comment :comments="articleData.replies" />

      <suspension
        :backShow="true"
        position="right"
        :_style="{ width: '70%', height: '100%' }"
        :round="false"
      >
        <!-- 插槽内容 -->
        <div>
          <div class="avatar">
            <user-info
              :img="authorData.avatar_url"
              :username="authorData.loginname"
            />
          </div>
          <van-divider dashed>作者其它话题 </van-divider>

          <van-cell
            v-for="(item, index) in authorData.recent_topics"
            :key="index"
            :title="item.title"
            is-link
            :to="{ name: 'articlePage', params: { id: item.id } }"
          />
        </div>
        <!-- /插槽内容 -->
      </suspension>
    </div>
  </div>
</template>

<script>
import Article from "@/components/article.vue";
import Comment from "@/components/comment.vue";
import Header from "@/components/header.vue";
import Suspension from "@/components/suspension.vue";
import UserInfo from "../components/userInfo.vue";

export default {
  name: "articlePage",
  components: {
    Header,
    Article,
    Suspension,
    Comment,
    UserInfo,
  },
  data() {
    return {
      loging: true,
      articleData: [],
      authorData: [],
      offsetTop: -54, //设置顶部搜索栏吸附后默认隐藏
      scrollTop: 0, //上拉的距离默认为零
    };
  },
  methods: {
    back() {
      history.back();
    },
    async onLoad(id) {
      const articleData = await this.$api.topics.getTopicsContent(id);
      const authorData = await this.$api.user.getUserInfo(
        articleData.data.author.loginname
      );
      return { articleData: articleData, authorData: authorData };
    },

    // 调用请求获取到异步结果
    setData(id) {
      this.onLoad(id).then((ret) => {
        console.log(ret);
        this.articleData = ret.articleData.data;
        this.authorData = ret.authorData.data;
        this.loging = false;
      });
    },
  },

  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next((vm) => {
      vm.setData(to.params.id);
    });
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    this.setData(to.params.id);
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
.article,
.avatar {
  margin: 10px;
}
</style>
