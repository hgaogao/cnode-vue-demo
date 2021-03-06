<template>
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
          <span v-else :class="item.tab" class="tab">{{ item.tab | tab }}</span
          >{{ item.title }}
        </div>
        <!-- <div class="info">{{ item.reply_count }}/{{ item.visit_count }}</div> -->
      </van-cell>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import userInfo from "./userInfo.vue";
export default {
  components: { userInfo },
  name: "postlist",
  components: { userInfo },
  props: ["id"],
  data() {
    return {
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
  watch: {
    id(val) {
      this.tabChange = false;
      this.page = 1;
      this.tab = val;
      this.onLoad(val);
    },
  },

  methods: {
    onLoad(val) {
      this.axios
        .get("/topics", {
          params: {
            tab: val || this.tab,
            page: this.page++,
            limit: 10,
          },
        })
        .then((response) => {
          if (this.tabChange) {
            this.listData = this.listData.concat(response.data);
          } else {
            this.listData = response.data;
            this.tabChange = true;
          }
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

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad(this.id);
    },
  },
};
</script>

<style scoped>
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