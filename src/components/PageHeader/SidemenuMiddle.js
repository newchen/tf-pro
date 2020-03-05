
import React from 'react';
import Tabs from '../Tabs'

export default (props) => {
  return (
    <div className='tf-header-middle'>
      <Tabs {...props} withContent={false}/>
    </div>
  )
}
