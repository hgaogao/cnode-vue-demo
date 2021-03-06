<template>
  <van-tabs v-model="active">
    <van-tab
      v-for="(item, index) in tabList"
      :key="index"
      :title="item.title"
      :to="{ name: 'tab', params: { id: item.path } }"
    >
    </van-tab>
  </van-tabs>
</template>

<script>
export default {
  name: "tabs",
  data() {
    return {
      active: 0,
      tabList: [
        {
          title: "全部",
          path: "all",
          id: 1,
        },
        {
          title: "问答",
          path: "ask",
          id: 2,
        },
        {
          title: "分享",
          path: "share",
          id: 3,
        },
        {
          title: "工作",
          path: "job",
          id: 4,
        },
        {
          title: "精选",
          path: "good",
          id: 5,
        },
      ],
    };
  },
  created() {
    // console.log(this.tabList.index(this.$route.params.id));
    var active = this.tabList.findIndex((val, index) => {
      return val.path == this.$route.params.id;
    });
    this.active = active;
  },
  watch: {
    $route(to, from) {
      var active = this.tabList.findIndex((val, index) => {
        return val.path == to.params.id;
      });
      this.active = active;
    },
  },
};
</script>

<style>
</style>