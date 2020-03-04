// 权限校验

import { getPosAtMenus } from './menu'

export default (pathname) => {
  return getPosAtMenus(pathname) ? true : false
}
