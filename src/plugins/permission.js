import router from '@/router'
import store from '@/store'
import {Message} from 'element-ui'
export default {
  install (vue) {
    router.beforeEach((to, from, next) => {
      if (to.path !== '/login') {
        const {userInfo} =  store.state
        if (userInfo && userInfo.token) {
          next()
        } else {
          next('/login')
          Message.error({
            message: '您还未登录，请先进行登录',
            showClose: true
          })
        }
      } else {
        next()
      }
    })
  }
}