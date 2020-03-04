import React from 'react';
import Header from '../Header'
import RightContent from "./RightContent";
import MiddleContent from './MiddleContent'

export default ({ dispatch, ...rest }) => {
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
      middleContentRender={(props) => <MiddleContent {...props}/>}
    />
  )
}
