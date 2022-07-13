import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui' // elementUI
import 'element-ui/lib/theme-chalk/index.css';
import { ElementTiptapPlugin } from 'element-tiptap'; // 富文本编辑器
import 'element-tiptap/lib/index.css';
import '@/assets/css/index.less' // 自定义全局样式
import 'normalize.css/normalize.css' // 第三方的重定义样式库
import 'element-ui/lib/theme-chalk/index.css'; // ElementUI样式
import BaiduMap from 'vue-baidu-map' // 百度地图
import permission from './plugins/permission' // 自定义的路由守卫，写成了插件的格式
import VueParticles from 'vue-particles' // 粒子背景


Vue.use(ElementUI)
Vue.use(ElementTiptapPlugin, {});
Vue.use(permission)
Vue.use(BaiduMap, {
  ak: '8k2cFTWLm78FlK53ff5tv30vVotqZhGI'  //  在此输入你自己的百度地图ak
})
Vue.use(VueParticles)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate () {
    Vue.prototype.$bus = this // 全局总线
  }
}).$mount('#app')
