
export * from './constant'
export * from './path'
export * from './menu'
// export { isLogin, loginOut } from 'tf-party';

import { prefix } from './constant'

// 跳到登录页
export function toLoginPage() {
  window.location.href = prefix.login + encodeURIComponent(window.location.href)
}

