import {request} from './request'


// 用户登录  参数类型 body: mobile, code
export function login (data) {
  return request ({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data
  })
}



// 获取用户信息
export function getUserProfiles () {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
  })
}