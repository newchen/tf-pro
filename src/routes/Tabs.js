// 重写app.model方法, 实现namespace注册的监听

import React from 'react';
import { rewriteModel } from '@/utils/model'

export default ({
  location: { pathname },
  children,
  history
}) => {
  rewriteModel(pathname, history);

  return children
}
