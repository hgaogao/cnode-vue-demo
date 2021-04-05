// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axiosinit from './api'
import api from './api/api'
import VueCookie from 'vue-cookie';
import './registerServiceWorker'


Vue.use(VueCookie);
Vue.config.productionTip = false
Vue.prototype.axios = axiosinit
Vue.prototype.$api = api

import { Button } from 'vant';
import { Col, Row } from 'vant';
import { Icon } from 'vant';
import { Search } from 'vant';
import { Tab, Tabs } from 'vant';
import { List } from 'vant';
import { PullRefresh } from 'vant';
import { Sticky } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Popup } from 'vant';
import { Skeleton } from 'vant';
import { Divider } from 'vant';
import { Toast } from 'vant';
import { NavBar } from 'vant';
import { Form } from 'vant';
import { Field } from 'vant';

Vue.use(Field);
Vue.use(Form);
Vue.use(NavBar);
Vue.use(Toast);
Vue.use(Divider);
Vue.use(Skeleton)
Vue.use(Popup);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Sticky);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Search);
Vue.use(Button);
Vue.use(Col);
Vue.use(Row);
Vue.use(Icon);
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

Vue.filter('formatDate', function (str) {
  if (!str) return ''
  var date = new Date(str)
  var time = new Date().getTime() - date.getTime()//获取过去了多少毫秒
  if ((time / 1000) < 30) {
    return "刚刚"
  } else if ((time / 1000 < 30)) {
    return '刚刚'
  } else if (time / 1000 < 60) {
    return parseInt((time / 1000)) + '秒前'
  } else if ((time / 60000) < 60) {
    return parseInt((time / 60000)) + '分钟前'
  } else if ((time / 3600000) < 24) {
    return parseInt(time / 3600000) + '小时前'
  } else if ((time / 86400000) < 31) {
    return parseInt(time / 86400000) + '天前'
  } else if ((time / 2592000000) < 12) {
    return parseInt(time / 2592000000) + '月前'
  } else {
    return parseInt(time / 31536000000) + '年前'
  }
})
Vue.filter('tab', function (str) {
  switch (str) {
    case "all":
      return "推荐"
      break;
    case "ask":
      return "问答"
      break;
    case "good":
      return "精选"
      break;
    case "job":
      return "工作"
      break;
    case "share":
      return "分享"
      break;
    default:
      break;
  }
})