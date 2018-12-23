import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    name: 'login',
    // 按需加载，作用是吧login当成文件名的js
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
    // 重定项
    redirect: { name: 'welcome' },
    children: [
      {
        path: 'users',
        name: 'users',
        component: () => import(/* webpackChunkName: "users" */ '../views/Users.vue') },
      {
        path: 'welcome',
        name: 'welcome',
        component: () => import(/* webpackChunkName: "home" */ '../views/Welcome.vue') },
      {
        path: 'rights',
        name: 'rights',
        component: () => import(/* webpackChunkName: "rights" */ '../views/Rights.vue') },
      {
        path: 'roles',
        name: 'roles',
        component: () => import(/* webpackChunkName: "roles" */ '../views/Roles.vue') },
      {
        path: 'goods',
        name: 'goods',
        component: () => import(/* webpackChunkName: "goods" */ '../views/Goods.vue') },
      {
        path: 'categories',
        name: 'categories',
        component: () => import(/* webpackChunkName: "categories" */ '../views/Categories.vue') },
      {
        path: 'add',
        name: 'add',
        component: () => import(/* webpackChunkName: "add" */ '../views/Goodsadd.vue') }
    ]
  }
  ]
})
