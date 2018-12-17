import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'login',
    // 按需加载，作用是吧login当成文件名的js
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    // 按需加载，作用是吧login当成文件名的js
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
  }
  ]
})
