const href = window.location.href

export const isOnline = href.indexOf('test.tf56.com') === -1
  && !/^http(s)?:\/\/localhost/.test(href)
  && !/^http(s)?:\/\/[0-9]+/.test(href)

// 前缀
export let prefix = {
  api: '', // 后端接口
  csrf: '', // csrf

  login: '//v1test.tf56.com/s/tfWeb/index.html#/login?redirectUrl=',
}

// 区分是开发环境还是线上
if (isOnline) {
  prefix = {
    ...prefix,

    login: '//v1.tf56.com/s/tfWeb/index.html#/login?redirectUrl=',
  }
}
