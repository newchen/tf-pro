# 基于Ant Design Pro的增强(支持多标签页)


## 已完成的功能
1. 菜单和权限组件
2. 多标签页组件
3. 新增'tf-side-top-tab', 'tf-sidemenu-tab'布局
4. 一个页面多开标签页时, namespace无感知动态切换
5. 标签页: 跳转, 刷新, 删除功能, 并对外提供了更多api方法


## 后续待完成
1. 抽离成一个组件
2. 左边菜单点击: 一个页面可以多开
3. 菜单有时层级不展开
4. 可以自动读取路由文件, 不用手动导入(ps: require.context失效了)
5. 再新增'tf-side-tab'布局
6. iframe嵌入支持
7. 无layout情况


## 使用方式
1. 新开/跳转标签页, 请使用`@/utils/tabs`中的`jumpTo`方法, 使用方式同`history.push`方法

2. 如果一个页面需要能多开标签页, 例如列表的详情, 请设置path类似于: `/detail/:id`, 同时请使用`@/utils/connect`下的`connect`方法

3. 在最外层config文件夹的`defaultSettings`文件中, 主要有如下配置项:

```
{
  ...
  fixedHeader: true,
  fixSiderbar: true,

   /*
    菜单模式, 支持:
      1. sidemenu：右侧导航，ant-pro自带
      2. topmenu：顶部导航，ant-pro自带
      3. tf-side-top-tab, 新增
      4. tf-sidemenu-tab, 新增
      5. tf-side-tab, 新增

    ps: 更改菜单模式时, 一般也会改siderWidth和menuIndent的值
  */
  layout: 'tf-side-top-tab',

  menu: { // 菜单相关配置
    remote: false, // 是否加载远程菜单, 不加载远程时使用本地路由配置的菜单
    onlyRemote: false, // 是否只使用远程菜单, 忽略本地路由菜单
    prefix: '', // 路径前缀, 如果远程加载菜单, 给远程菜单添加该前缀
    fields: { // 后端返回的字段名称
      name: 'name',
      path: 'path',
      children: 'children',
      icon: 'icon',
      isHome: 'isHome' // 主页
    }
  },
  tabs: { // 多标签页相关配置
    defaultOpen: [ // 默认一进系统, 就存在的标签页面
      // name: 标题, key: 路径, closable: 能否关闭
      { name: '首页(默认加载,不可关闭)', key: '/', closable: false },
      // { name: '欢迎2', key: '/sys2/welcome2', closable: false }
    ],
    multiOpen: [ // 点击左侧菜单, 能多开的页面

    ],
    max: { count: 20, msg: '最多只能打开20个标签, 请关闭一些后再试' },
    min: { count: 1, msg: '最少必须有1个标签' }
  },

  title: 'Antd',                 // 左上角标题
  siderWidth: 176, // 256/176    // 左侧菜单的宽度
  menuIndent: 16 // 24/16        // 菜单的缩进
}

```


## 问题/疑问
2. dva中的app.unmodel不会把state清除? 就算重新app.model注册model, 之前页面的state还会在?
3. app.unmodel会重新导致页面加载一次?


## 版本更新

0.1.1: 
  1. tf-side-top-tab布局fixed时tab宽度问题
  2. 内容高度100%
