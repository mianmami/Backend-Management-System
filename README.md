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
项目中对cookie, session, vuex都进行了使用，这并不是最优的解决方案，而是为了学习巩固这些技术做出的尝试。

cookie: 存放手机号+登录密码 (模拟记住我的功能)
sessionStorage: 存放登陆时返回的用户信息，其中最重要的是token信息
vuex: 
  - userInfo: 同sessionStorage的保存的用户信息
  - isLoading: 防止重复点击按钮发送多次相同请求
  - userDetailInfo： 用户的详细信息
```
