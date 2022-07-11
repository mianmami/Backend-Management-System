import {request} from './request'


// 上传用户头像
export function uploadUserAvatar (data) {
  return request({
    method: 'patch',
    url: '/mp/v1_0/user/photo',
    data
  })
}