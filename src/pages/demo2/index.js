import React from 'react';
import { Input } from 'antd'
import { connect } from "@/utils/connect" // 注意此处

const Demo2 = ({ text, dispatch }) => {
  // console.log('6666,demo2',text)
  function handleClick() {
    dispatch({
      type: 'demo2/update',
      payload: (new Date()).toLocaleDateString()
    })
  }
  return (
    <div>
      <h2>demo2页面</h2>
      <div>{text}</div>
      <button onClick={handleClick}>点击改变</button>
      <Input />
    </div>
  )
}

export default connect(({ demo2 }) => ({
  ...demo2
}))(Demo2)
