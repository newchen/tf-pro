import React from 'react';
import { Input } from 'antd'
import { connect } from "dva"

const Demo3 = ({ text, dispatch }) => {
  // console.log('6666,demo2',text)
  function handleClick() {
    dispatch({
      type: 'demo3/update',
      payload: (new Date()).toLocaleDateString()
    })
  }
  return (
    <div>
      <h2>demo3页面</h2>
      <div>{text}</div>
      <button onClick={handleClick}>点击改变</button>
      <Input />
    </div>
  )
}

export default connect(({ demo3 }) => ({
  ...demo3
}))(Demo3)
