import React from 'react';
import Header from '../Header'

import RightContent from "./RightContent";
import SideTopMiddle from './SideTopMiddle'
import SideTopBottom from './SideTopBottom'
import SidemenuMiddle from './SidemenuMiddle'

export default ({ dispatch, ...rest }) => {
  let { layout } = rest
  let middleContent = null
  let bottomContent = null

  switch(layout) {
    case 'tf-side-top-tab':
      middleContent = (props) => <SideTopMiddle {...props}/>
      bottomContent = (props) => <SideTopBottom {...props}/>
      break;
    case 'tf-sidemenu-tab':
      middleContent = (props) => <SidemenuMiddle {...props}/>
      break;
  }

  const handleMenuCollapse = payload => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed', // 左侧菜单是否收缩
        payload,
      });
    }
  };

  return (
    <Header
      { ...rest }
      rightContentRender={() => <RightContent />}
      onCollapse={handleMenuCollapse}
      middleContentRender={middleContent}
      bottomContentRender={bottomContent}
    />
  )
}
