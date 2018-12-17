import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/index.scss'
// 引进
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 使用
Vue.use(ElementUI)
Vue.config.productionTip = false
// 路由守卫
router.beforeEach((to, from, next) => {
// 获取token
  let mytoken = localStorage.getItem('mytoken')
  if (mytoken) {
    // 有mytoken就可以执行下步
    next()
  } else {
    // 没有token时,不是首页就跳回首页
    if (to.name !== 'login') {
      next('/')
    } else {
      // 是首页就下一步
      next()
    }
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
