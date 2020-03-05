import React from 'react';
import { Tabs, Icon } from 'antd';
// import router from 'umi/router';
import { getAllOpenTabs } from '@/utils/tabs'
import { remove, refresh, jumpTo } from '@/utils/tabs'

const { TabPane } = Tabs;

export default ({
  children,
  location: { pathname },
  // dispatch,
  withContent = true,
  ...rest
}) => {
  function handleChange(activeKey) {
    jumpTo(activeKey)
  }

  function handleEdit(targetKey, action) {
    if (action === 'remove') {
      remove(targetKey)
    }
  }

  function handleRefresh(tab) {
    refresh(tab.key)
  }

  let allOpenTabs = getAllOpenTabs(
    pathname,
    withContent ? children : null
  );

  return (
    <Tabs
        hideAdd
        onChange={handleChange}
        activeKey={pathname}
        type="editable-card"
        onEdit={handleEdit} // 新增和删除页签的回调
        {...rest}
      >
        {
          allOpenTabs.map(tab => (
            <TabPane
              tab={
                <span>
                  <Icon type="reload" onClick={handleRefresh.bind(null, tab)}/>
                  {tab.name}
                </span>
              }
              key={tab.key}
              closable={tab.closable === false ? false: true}
            >{ withContent ? tab.content : null }</TabPane>
          ))
        }
      </Tabs>
  )
}
