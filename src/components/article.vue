<template>
  <div v-if="article && article.length == 0">
    <van-skeleton title :row="10" />
  </div>
  <!-- 正文 -->
  <div v-else class="article">
    <div class="top">
      <user-info
        :img="article.author.avatar_url"
        :username="article.author.loginname"
        :date="article.create_at"
        :browse="article.visit_count"
        :comment="article.reply_count"
      />
      <van-button type="primary" size="mini" @click="collection(article.id)"
        ><span v-if="article.is_collect">取消收藏</span>
        <span v-else>收藏</span>
      </van-button>
    </div>
    <div class="title">
      <h2>{{ article.title }}</h2>
      <div class="van-hairline--top-bottom"></div>
    </div>
    <div v-html="article.content" id="content"></div>
  </div>
</template>

<script>
import mixinUser from "../mixins/user";
import userInfo from "./userInfo.vue";
export default {
  components: { userInfo },
  name: "Article",
  mixins: [mixinUser],
  props: ["articleData"],
  data() {
    return {
      article: [],
    };
  },
  //用这种方法监听props数据的话用v-if判断数组是否已经赋值
  watch: {
    articleData(newArray) {
      console.log(newArray);
      this.article = newArray;
    },
  },

  // 这种的话也可一获取到值但是会报错一次
  // watch: {
  //   articleData: {
  //     immediate: true, // 这句重要
  //     handler(val) {
  //       console.log(val);
  //     },
  //   },
  // },

  methods: {
    collection(id) {
      var token = this.getToken() || "";
      if (this.article.is_collect) {
        this.$api.topics.de_collect(id, token);
        if (token !== "") {
          this.$toast("取消收藏");
        }
        this.article.is_collect = !this.article.is_collect;
      } else {
        this.$api.topics.collect(id, token);
        if (token !== "") {
        this.$toast("收藏成功");
        }
        this.article.is_collect = !this.article.is_collect;
      }
    },
  },
};
</script>

<style>
@import url("../assets/markdown-github.css");
.article .top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>