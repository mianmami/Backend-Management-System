import Vue from 'vue'
import Vuex from 'vuex'
import {login} from '@/api/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
  },

  mutations: {
    setUser (state, value) {
      state.userInfo = value
    }
  },
  actions: {
     async onLogin(context, value) {
      try {
        const res = await login(value)
        context.commit("setUser", res.data.data) // 把客户信息的token拿到，并准备保存到vuex中
        return Promise.resolve('ok')
      } catch (err) {
        return Promise.reject(err)
      }     
     
    }
  },
  
})
