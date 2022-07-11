import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'

import '@/assets/css/index.less' // 自定义全局样式
import 'element-ui/lib/theme-chalk/index.css'; // ElementUI样式

import permission from './plugins/permission'
Vue.use(ElementUI)
Vue.use(permission)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate () {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
