import React from 'react';
import { getAllOpenTabs } from '@/utils/tabs'

export default ({
  children,
  location: { pathname },
  ...rest
}) => {
  let allOpenTabs = getAllOpenTabs(pathname, children);

  return (
    <div className='tf-layout-content'>
      {
        allOpenTabs.map(tab => {
          return (
            <div
              className={`tf-tab-content ${tab.key === pathname ? '' : 'tf-hide'}`}
              key={tab.key}
            >
              { tab.content }
            </div>
          )
        })
      }
    </div>
  )
}
