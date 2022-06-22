# backend-management-system

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 备注
```js
项目中对cookie, sessionStorage, vuex都进行了使用，这并不是最优的解决方案，而是为了学习巩固这些技术做出的尝试。

cookie: 存放手机号+登录密码 (模拟记住我的功能)
sessionStorage: 存放登陆时返回的用户信息，其中最重要的是token信息
vuex: 
  - userInfo: 同sessionStorage的保存的用户信息
  - isLoading: 防止重复点击按钮发送多次相同请求
  - userDetailInfo： 用户的详细信息
```
### 注意点
```js
vuex不能持久化保存数据，页面刷新，state中保存的数据会消失不见(因为进入某个页面的权限是得到token，但是如果token保存在vuex中，那么每次刷新，路由守卫都会进行拦截，从而导致不能进入)。

访问每个页面的数据都需要用户认证(即token), 为统一处理，应该放在发送请求的拦截器中

项目中用的折叠方式是自己用transition标签写的，而不是elementUI自带的

使用NPprogress，来进行进度条的加载
```