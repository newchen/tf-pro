import React from 'react';
import router from 'umi/router';
import { Menu, Icon } from 'antd';
import { getPosAtMenus, getHomePage, getHomePathByName } from '@/utils';

export default (props) => {
  let {
    location: { pathname },
    menus,
  } = props

  if (menus.length === 0) {
    return null;
  }

  let pos = getPosAtMenus(pathname)
  let selectedKey = getHomePage(pos).name

  function handleClick(e) {
    router.push(getHomePathByName(e.key))
  }

  return (
    <div className="tf-header-middle">
      <Menu onClick={handleClick} selectedKeys={[selectedKey]} mode="horizontal">
        {
          menus
            .filter(v => !v.hideInMenu) // 去掉不在菜单中显示的
            .map(item => {
              return (
                item.name
                ? (<Menu.Item key={item.name}>
                  { item.icon ? <Icon type={item.icon} /> : null }
                  { item.name }
                  </Menu.Item>)
                : null
              )
            })
        }
      </Menu>
    </div>
  )
}
