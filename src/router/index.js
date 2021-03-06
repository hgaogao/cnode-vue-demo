import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/Home'
import ArticlePage from '@/page/ArticlePage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      component: Home,
    },
    {
      path: '/tab',
      redirect: '/tab/all'
    },
    {
      path: '/tab/:id',
      name: 'tab',
      component: Home,
      meta: {
        keepAlive: true
      }

    },
    {
      path: '/article/:id',
      name: 'articlePage',
      component: ArticlePage

    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }

})
