// 控制布局等一些属性

// 新增的新布局
export let newLayout = [
  'tf-side-top-tab',
  'tf-sidemenu-tab',
  'tf-side-tab'
];

export const settings = {
  navTheme: 'dark',
  // 拂晓蓝
  primaryColor: 'daybreak',
  /*
    菜单模式, 支持:
      1. sidemenu：右侧导航，
      2. topmenu：顶部导航
      3. newLayout里面的布局

    ps: 更改菜单模式时, 一般也会改siderWidth和menuIndent的值
  */
  layout: newLayout[1],
  contentWidth: 'Fluid',
  fixedHeader: true,
  autoHideHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  disableMobile: true,

  menu: { // 菜单相关配置
    locale: false, // ant-design-pro-layout组件, 关闭 menu 的自带的全球化

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

  title: 'Antd',                  // 左上角标题
  siderWidth: 176, // 256/176     // 左侧菜单的宽度
  menuIndent: 16, // 24/16        // 菜单的缩进

  pwa: false,
  iconfontUrl: '',
};
export default settings;

// 是否多标签页的布局
export const isTabLayout = newLayout.includes(settings.layout)
