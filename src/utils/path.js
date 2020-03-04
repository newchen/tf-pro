// 路径模块

const DOT_RE = /\/\.\//g; //---> /./
const DOUBLE_DOT_RE = /\/[^/]+\/\.\.\//; //---> /x/../

export function join(path, prefix) {
  if(!prefix) return path

  // 最后一位不是 /
  if (prefix.substr(-1) !== '/') {
    prefix = prefix + '/'
  }

  if (path.charAt(0) === '/') {
    return prefix + path.substring(1)
  }

  return prefix + path;
}

// 拼接路径
// ifFirstSlashNeedComplete: 如果路径是以/开头, 是否还需要在前面补全前缀路径
export function joinPath(path, ifFirstSlashNeedComplete, ...rest) {
  path = path.trim();

  // 以 // 或 http: 或 https: 开头
  if (/^\/\//.test(path) || /^(http|https):/.test(path)) {
    return path;
  }

  if (ifFirstSlashNeedComplete === false // false 不补全
    && path.charAt(0) === '/') {
      return path;
  }

  // ifFirstSlashNeedComplete 也是路径
  if (typeof ifFirstSlashNeedComplete === 'string') {
    rest = [ifFirstSlashNeedComplete, ...rest]
  }

  path = rest.reduceRight((pre, cur) => {
    return join(pre, cur)
  }, path)

  return realpath(path)
}

// 去掉路径中的'/.'和'/x/..' 因为'.'表示当前路径，'..'表示上一层路径
// realpath("http://test.com/a/./b/../c") ==> "http://test.com/a/c"
function realpath(path) {
  // /a/b/./c/./d ==> /a/b/c/d
  path = path.replace(DOT_RE, "/");//去除路径中的'.'

  // a/b/c/../../d  ==>  a/b/../d  ==>  a/d
  while (path.match(DOUBLE_DOT_RE)) {
    path = path.replace(DOUBLE_DOT_RE, "/");
  }

  return path;
}
