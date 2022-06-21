import Vue from 'vue'
import Vuex from 'vuex'
import {login} from '@/api/user'

import {setItem, getItem, removeItem} from '@/utils/storage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    isLoading : false
  },

  mutations: {
    // 把登录时返回的用户信息，记录在Vuex, 同时在session保存一份
    setUser (state, value) {
      state.userInfo = value
      setItem('userInfo', )
    },

    // 把loading状态记录在vuex
    startLoading (state, value) {
      state.isLoading = true
    },
    stopLoading (state, value) {
      state.isLoading = false
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
