import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: '/',
    component: () => import('@/views/layout/Layout.vue'),
    children: [
      {
        // 注意：如果没有写路径，那么这个子路由就作为默认加载的子路由
        path: '',
        name: 'home',
        component: () => import('@/views/home/Home.vue')
      },
      {
        path: 'content',
        name: 'content',
        component: () => import('@/views/content/Content.vue')
      },
      {
        path: 'resource',
        name: 'resource',
        component: () => import('@/views/resource/Resource.vue')
      },
      {
        path: 'essay',
        name: 'essay',
        component: () => import('@/views/essay/Essay.vue')
      },
      
      {
        path: 'comment',
        name: 'comment',
        component: () => import('@/views/comment/Comment.vue')
      },
      {
        path: 'fans',
        name: 'fans',
        component: () => import('@/views/fans/Fans.vue')
      },
      {
        path: 'setting', 
        name: 'setting',
        component: () => import('@/views/setting/Setting.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
