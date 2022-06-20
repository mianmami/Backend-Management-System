import {request} from './request'

/* 
用户登录
  - method: post
  - url: /mp/v1_0/authorizations
  - 参数类型 body: 
      - mobile 
      - code
*/
export function login (data) {
  return request ({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data
  })
}