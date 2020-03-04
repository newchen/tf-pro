import React from 'react';
import { Input } from 'antd'
import { connect } from 'dva'
import { Link } from 'umi';
import { jumpTo } from '@/utils/tabs'

const Demo1 = ({ text, dispatch }) => {
  console.log('demo111111')
  function handleClick() {
    dispatch({
      type: 'demo1/update',
      payload: 'demo111111' //+ (new Date()).toLocaleDateString()
    })
  }
  return (
    <div style={{height: '1000px'}}>
      <h2>demo1页面</h2>
      <div>{text}</div>
      <button onClick={handleClick}>点击改变</button>
      <Input />

      {/* <Link to="/sys2/demo/detail/1">跳转1</Link> */}
      <span onClick={
        () => jumpTo({
          pathname: '/sys2/demo/detail/1',
          query: {
            a: 'aa',
          },
        }, '标题: 跳转1')
        }>跳转1</span>
      <Link to="/sys2/demo/detail/2">跳转2</Link>
      <Link to="/sys2/demo/detail/3">跳转3</Link>
    </div>
  )
}

export default connect(({ demo1 }) => {
  // console.log('connect:',demo1)
  return { ...demo1 }
})(Demo1)
