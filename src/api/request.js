import axios from 'axios'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import JSONbig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net',
  timeout: '5000',
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    try {
      return JSONbig.parse(data)
    } catch (e) {
      return data
    }
  }],
})

request.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = store.state.userInfo ? `Bearer ${store.state.userInfo.token}` : ''
  return config
}, (error) => {
  return Promise.reject(error)
})

request.interceptors.response.use(config => {
  NProgress.done()
  return config
}, (error) => {
  return Promise.reject(error)
})
export { request }