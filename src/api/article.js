import { request } from './request'


/* 
获得文章列表，
status: 文章状态 展示哪一种类型的数据 不传->全部  0->草稿 1->待审核 2->审核通过 3->审核失败 4->已删除
channel_id: 频道 不传表示所有频道
page: 页数
per_page: 每页条数
response_type:  
  - 不传入：获取内容管理的数据
  - 传入comment: 返回用于评论管理的字段
  - 传入statistic: 返回用于图文数据的字段 
  
*/
export function getArticleList(params) {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}

/* 
获得文章频道，不需要参数
*/
export function getArticleChannel () {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

/* 
  删除文章, 需要提供文章的id号
*/
export function deleteArticle (target) {
  return request({
    method: 'DELETE',
    url: `mp/v1_0/articles/${target}`
  })
}