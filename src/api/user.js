import { request } from './request'


// 用户登录  参数类型 body: mobile, code
export function login(data) {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data
  })
}



// 获取用户信息
export function getUserProfiles() {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
  })
}

// 修改用户资料 参数：需要修改的内容传上去即可
export function changeUserProfile(data) {
  return request({
    method: 'patch',
    url: '/mp/v1_0/user/profile',
    data
  })
}

// 获取粉丝列表
export function getFansList(params) {
  return request({
    method: 'get',
    url: '/mp/v1_0/followers',
    params
  })
}