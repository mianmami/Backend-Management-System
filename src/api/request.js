import axios from 'axios'

const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net',
  timeout: '5000',
})

request.interceptors.request.use(config=>{
  return config
})
export {request}