// 把项目中用不到的配置抽离出来
// https://preview.pro.ant.design/  专用环境变量，请不要在你的项目中使用它。

import themePluginConfig from './themePluginConfig';
// import defaultSettings from './defaultSettings'; // https://umijs.org/config/

// const { pwa } = defaultSettings;

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';

let plugins = []

if (isAntDesignProPreview) {
  // 针对 preview.pro.ant.design 的 GA 统计代码
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
}

export default {
  plugins,

  // pwa: pwa
  //   ? {
  //       workboxPluginMode: 'InjectManifest',
  //       workboxOptions: {
  //         importWorkboxFrom: 'local',
  //       },
  //     }
  //   : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
  // // dll features https://webpack.js.org/plugins/dll-plugin/
  // // dll: {
  // //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
  // //   exclude: ['@babel/runtime', 'netlify-lambda'],
  // // },


  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || 'site', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },

  // manifest: {
  //   basePath: '/',
  // },

}
