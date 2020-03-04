import routerConfig from '../config/router.config'
import { cloneDeep } from 'lodash'

/*
菜单数据格式定义如下, ps: 只有path是必须的
[
  {
    "path": "/dashboard",
    "name": "dashboard",
    "icon": "dashboard",
    "children": [
      {
        "path": "/dashboard/analysis",
        "name": "analysis"
      },
      {
        "path": "/dashboard/monitor",
        "name": "monitor"
      },
      {
        "path": "/dashboard/workplace",
        "name": "workplace"
      }
    ]
  }
  // ....
]
ts 定义在此：https://github.com/ant-design/ant-design-pro-layout/blob/56590a06434c3d0e77dbddcd2bc60827c9866706/src/typings.ts#L18
*/

// 这里根据前端配置的路由, 模拟后端返回的路由
function convert(data) {
  data.map(v => {
    if(v.routes) {
      v.children = v.routes
      delete v.routes

      convert(v.children)
    }

    if (v.path && v.path.includes(':id')) {
      v.path = v.path.replace(':id', '12345')
    }

    if (v.component) {
      delete v.component
    }
    if (v.Routes) {
      delete v.Routes
    }

    return v;
  })

  return data
}

export default {
  'POST /api/menus': {
    code: 0,
    // data: convert(cloneDeep([routerConfig[1]])) // 只取layout的菜单
    data: [{
      "path": "/sys1",
      "name": "系统1",
      "children": [{
        "path": "welcome",
        "name": "welcome",
        "icon": "smile",
        "children": [{
          "path": "welcome/:id",
          "name": "欢迎下一级2",
          "icon": "smile"
        }]
      }, {
        "path": "admin",
        "name": "admin",
        "icon": "crown"
      }]
    }, {
      path: '/sys2',
      icon: 'crown',
      name: '系统2',
      children: [{
        "path": "welcome1",
        "name": "欢迎111",
        "icon": "smile"
      }, {
        "path": "welcome2",
        "name": "欢迎2",
        "icon": "smile",
        "isHome": 1
      }, {
        "path": "welcome3",
        "name": "欢迎3",
        "icon": "smile",
      }]
    }]
  }
};
