import tfRequest from 'tf-request'
import { prefix, joinPath, toLoginPage } from '@/utils/'

import { message } from 'antd';

export function request(url = '', opts = {}, codes = [0]) {
  url = joinPath(url, prefix.api)

  // 在该数组中的, 通过拦截, 不自动提示报错信息
  codes = [].concat(codes)

  return tfRequest(url, {
    type: 'json',

    csrfUrl: prefix.csrf,

    hasCsrf(url) {
      return false
    },

    interceptResponse(data) { //  拦截返回的请求做处理
      let { code, msg } = data;

      if (code === -3) { // 未登录
        return toLoginPage()
      }

      if (!codes.includes(code)) {
        message.error(msg)
        return Promise.reject({msg, code})
      } else {
        return data;
      }
    },

    ...opts
  })
}

export default request
