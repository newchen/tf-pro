import React from 'react';
import SideTopMiddle from './SideTopMiddle'
import Tabs from '../Tabs'

export default (props) => {
  let { layout } = props
  let content = null

  switch(layout) {
    case 'tf-side-top-tab':
      content = <SideTopMiddle {...props}/>
      break;
    case 'tf-sidemenu-tab':
      content = (
        <div className='tf-header-middle'>
          <Tabs {...props} withContent={false}/>
        </div>
      )
      break;
  }

  return content
}
