// 配置地址: https://umijs.org/zh/config/#%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE

import slash from 'slash2';

import routerConfig from './router.config'
import themeConfig from './theme.config'
import pluginsConfig from './plugins.config'
import proxyConfig from './proxy.config'

// https://preview.pro.ant.design/
import previewProConfig from './preview.pro.config'

// import webpackPlugin from './webpackPlugin'

export default {
  ...previewProConfig,

  hash: true,

  targets: {
    ie: 10,
  },

  // https://umijs.org/zh/config/#plugins
  plugins: [...previewProConfig.plugins , ...pluginsConfig],

  // umi routes: https://umijs.org/zh/guide/router.html
  routes: routerConfig,

  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: themeConfig,

  // https://umijs.org/zh/config/#proxy
  // https://umijs.org/zh/guide/mock-data.html#%E4%BD%BF%E7%94%A8-umi-%E7%9A%84-mock-%E5%8A%9F%E8%83%BD
  proxy: proxyConfig,

  // 忽略 moment 的 locale 文件，用于减少尺寸
  ignoreMomentLocale: true,

  // 给 less-loader 的额外配置项
  lessLoaderOptions: {
    javascriptEnabled: true,
  },

  // 禁用 redirect 上提
  disableRedirectHoist: true,

  // 给 css-loader 的额外配置项
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      // 如果是node_modules, ant.design.pro.less, global.less, 返回原样名称
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      // 如果是src目录下的less文件, 添加 'antd-pro-' 前缀
      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },

  // 通过 webpack-chain 的 API 扩展或修改 webpack 配置
  // https://umijs.org/zh/config/#chainwebpack
  // chainWebpack: webpackPlugin,

  treeShaking: true,

};
