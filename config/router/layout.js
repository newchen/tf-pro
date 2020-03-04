export default [{
  path: '/',
  Routes: ['./src/layouts/Login', './src/layouts/Tabs'], // 校验权限, 登录, tabs等
  component: '../layouts/BasicLayout',
  routes: [
    {
      path: '/welcome',
      name: 'welcome',
      icon: 'smile',
      component: './Welcome',

      routes: [
        {
          path: 'welcome/:id',
          name: '欢迎下一级',
          icon: 'smile',
          component: './Welcome',
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      icon: 'crown',
      component: './Admin',
    },
    {
      path: '/welcome1',
      name: '欢迎1',
      icon: 'smile',
      component: './Welcome',
    },
    {
      path: '/welcome2',
      name: '欢迎2',
      icon: 'smile',
      component: './Welcome',
    },
    {
      component: './404',
    },
  ]
}]
