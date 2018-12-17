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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
