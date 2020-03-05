import React from 'react';
import Tabs from '../Tabs'

export default (props) => {
  return (
    <div className='tf-layout-header-bottom'>
      <Tabs {...props} withContent={false}/>
    </div>
  )
}
