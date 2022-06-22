import axios from 'axios'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net',
  timeout: '5000',
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