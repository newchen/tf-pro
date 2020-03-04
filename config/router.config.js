// umi routes: https://umijs.org/zh/guide/router.html

// todo
// const glob = require('glob')

// let files = new glob.Glob('./router/*.js', { cwd: __filename, sync: true }).found;
// console.log('files',files)

export default [
  {
    path: '/login',
    component: './login'
  },
  {
    path: '/',
    Routes: [ './src/routes/Login', './src/routes/Tabs'], // 校验权限, 登录等
    component: '../layouts/BasicLayout',
    routes: [
     /* {
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
      },*/

      // tf-side-top-tab 布局
      {
        "path": "/",
        "name": "首页(默认加载,不可关闭)",
        "icon": "smile",
        hideInMenu: true, // 不在菜单中显示
        component: './welcome/',
      },
      {
        "path": "/sys1",
        "name": "系统1",
        "icon": "smile",
        "routes": [{
          "path": "welcome",
          "name": "二级菜单",
          "icon": "smile",
          "routes": [{
            "path": "welcome/:id",
            "name": "三级菜单(欢迎下一级2)",
            "icon": "smile",
            'component': './welcome/',
          }]
        }]
      }, {
        path: '/sys2',
        icon: 'crown',
        name: '系统2',
        routes: [{
          "path": "welcome1",
          "name": "欢迎1",
          // "icon": "smile",
          component: './welcome/',
        }, {
          "path": "welcome2",
          "name": "欢迎2",
          "icon": "smile",
          "isHome": 1,
          component: './welcome/',
        }, {
          "path": "demo/list",
          "name": "测试列表页面",
          "icon": "smile",
          hideChildrenInMenu: true,
          component: './demo1/',
          // routes:[
          //   {
          //     "path": "demo/detail/:id",
          //     "name": "测试详情detail页面",
          //     "icon": "smile",
          //     // hideInMenu: true,
          //     component: './demo2/',
          //   }
          // ]
        }, {
          "path": "demo/detail/:id",
          "name": "测试详情detail页面",
          "icon": "smile",
          hideInMenu: true,
          component: './demo2/',
        },{
          "path": "demo/test",
          "name": "另一个测试页面",
          "icon": "smile",
          // hideInMenu: true,
          component: './demo3/',
        }]
      },
      {
        component: './404',
      },
    ]
  },
  {
    component: './404',
  },
]
