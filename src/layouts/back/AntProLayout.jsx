/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 * https://github.com/ant-design/ant-design-pro-layout/blob/master/README.zh-CN.md
 * https://prolayout.ant.design/example
 */
import ProLayout from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import { Link } from 'umi';
import { connect } from 'dva';

import RightContent from '@/components/PageHeader/RightContent';
import menuDataRender from '@/utils/menu'

import check from '@/utils/authority'
import Authority from '@/components/Authority'
import NoMatch from '@/pages/404'
import Loading from '@/components/PageLoading'

import logo from '../assets/logo.png';

const BasicLayout = props => {
  const {
    dispatch,
    children,
    settings,
    location: { pathname },
    menuLoaded
  } = props;

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'global/fetchMenus', // 获取菜单
      });
    }
  }, []);

  const handleMenuCollapse = payload => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed', // 左侧菜单是否收缩
        payload,
      });
    }
  };

  return (
    <ProLayout
      logo={logo} // 支持字符串和方法
      // title="" // 只支持字符串, 后面settings配置中会覆盖此处
      menuHeaderRender={(logoDom, titleDom) => (
        <div>
          {logoDom}
          {titleDom}
        </div>
      )}

      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}

      footerRender={false}
      menuDataRender={menuDataRender.bind(null, props)}
      onCollapse={handleMenuCollapse}
      rightContentRender={() => <RightContent />} // 自定义头右部的 render 方法
      // headerRender={(props) => <PageHeader {...props} />} // 自定义头部

      { ...props }
      { ...settings } // 注意: settings中包含title属性
    >
      <Authority authority={check(pathname)} noMatch={ menuLoaded ? NoMatch : Loading }>
        { children }
      </Authority>
    </ProLayout>
  );
};

export default connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  menus: global.menus,
  menuLoaded: global.menuLoaded,
  settings,
}))(BasicLayout);
