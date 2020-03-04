// 菜单组件

import pathToRegexp from 'path-to-regexp'
import defaultSettings from '../../config/defaultSettings'
import { joinPath } from '@/utils'

const {
  layout,

  menu: {
    remote: menuRemote,
    prefix: menuPrefix,
    onlyRemote,
    fields: {
      name: fName,
      path: fPath,
      children: fChildren,
      icon: fIcon,
      isHome: fIsHome
    }
  }
} = defaultSettings

let cachedMenusMap = { regexpPath: [] } // 缓存的菜单
let getCachedMergeMenus = () => {} // 获取缓存的合并后的菜单
let homePageArr = [] // 主页信息数组

// 获取系统/模块主页
export function getHomePage(index) {
  return homePageArr[index] || {}
}
export function getHomePathByName(name) {
  let obj = homePageArr.filter(v => v.name === name)[0]

  return obj ? obj.path : '/'
}

// 菜单转为map形式
function getMenusMap(menus, obj = {}) {
  menus.forEach(item => {
    if (item.path) {
      obj[item.path] = { ...item, children: null }
    }

    if (item.children) {
      getMenusMap(item.children, obj)
    }
  })

  return obj
}

// 获取合并的菜单
function getMergeMenus() {
  let cached = {};

  return (remoteMenu, localMenu, pos = 0) => {
    if (cached[pos]) return cached[pos]

    let localMap = getMenusMap(localMenu);

    let arr = (function fn(menus) {
      return menus.map(item => {
        let temp  = { ...item }
        let local = localMap[temp.path]

        if (local) {
          // 后端返回的数据优先级比本地配置的高
          temp = { ...local, ...temp }
        } else {
          console.warn(`本地未配置路由: ${temp.path}`)
        }

        if (temp.children) {
          temp.children = fn(temp.children)
        }

        return temp;
      })
    })(remoteMenu)

    return cached[pos] = arr;
  }
}

// 所有路径都拼接为完整路径, 添加前缀
// ps: 如果后端返回字段名称不是path, name, children之类, 这里也做了相关处理
export function handleMenus(
  menus,
  ifFirstSlashNeedComplete = false, // 如果路径是以/开头, 是否还需要在前面补全前缀路径
  parentPath = menuPrefix,
  parentPos = '',
  homePageIndex = 0,
  homePageName
) {
  const isRoot = parentPos === '' // 是根节点

  if (isRoot) {
    cachedMenusMap = { regexpPath: [] } // regexpPath: 是否是类似 /a/:id 这种路径
    getCachedMergeMenus = getMergeMenus() // 重新初始化
  }

  return [].concat(menus).map((item, index) => {
    if (isRoot) {
      homePageIndex = index
      homePageName = menus[index][fName]
    }

    item.__pos = joinPath(index + '', parentPos) // 添加__pos属性, 表示在菜单中的位置

    item[fName] && (item.name = item[fName])
    item[fIcon] && (item.icon = item[fIcon])

    if(item[fPath]) {
      // 拼接路径
      item.path = joinPath(item[fPath], ifFirstSlashNeedComplete, parentPath)

      // 默认取第一个路径作为主页
      if(!homePageArr[homePageIndex] && !item[fChildren]) {
        homePageArr[homePageIndex] = {
          path: item.path,
          name: homePageName
        }
      }

      if(isRegexpPath(item.path)) {
        cachedMenusMap.regexpPath.push(item)
      } else {
        cachedMenusMap[item.path] = item
      }
    }

    // 如果有主页标识, 取该路径
    if(item[fIsHome]) {
      homePageArr[homePageIndex] = {
        path: item.path,
        name: homePageName
      }
    }

    if(item[fChildren]) {
      item.children = handleMenus(
        item[fChildren],
        ifFirstSlashNeedComplete,
        item.path || '',
        item.__pos,
        homePageIndex,
        homePageName
      )
    }

    return item;
  })
}

// 在第几项菜单里面
export function getPosAtMenus(pathname) {
  let pathAtMenus = getPathAtMenus(pathname)
  let pos = 0

  if (pathAtMenus) {
    pos = pathAtMenus.split('/')[0]
  }

  return pos;
}

/*
路径(pathname)在菜单的具体信息, ps:可能是多系统/模块菜单
  [
    {
      name: '系统1/模块1',
      path: 'xx',
      children: [...]
    },
    {
      name: '系统2/模块2',
      path: 'xx',
      children: [...]
    }
  ]
*/
export function getItemAtMenus(pathname) {
  if (cachedMenusMap[pathname]) {
    return cachedMenusMap[pathname]
  }

  // pathname可能是: /a/123, 但是菜单是: /a/:id
  if (cachedMenusMap.regexpPath.length > 0) {
    let r = cachedMenusMap.regexpPath.find(item => {
      let regexp = pathToRegexp(item.path)
      let match = regexp.exec(pathname)

      if (match) return true
    })

    if(r) return r
  }

  return null
}
// 路径(pathname)在菜单的位置
export function getPathAtMenus(pathname) {
  let item = getItemAtMenus(pathname)

  if (item) return item['__pos']
  return ''
}
// 路径(pathname)在菜单的name(标题)
// ps: 不考虑合并的菜单, 后端返回的name和前端不一致的情况, 一般来说都是一样的
export function getName(pathname) {
  let item = getItemAtMenus(pathname)

  if (item) return item.name
  return ''
}
export { getName as getTitle }

export function getPath(pathname) {
  let item = getItemAtMenus(pathname)

  if (item) return item.path
  return ''
}

// 包含了 : () ? 等之类的符号, 说明是正则式路由
function isRegexpPath(path) {
  return [':', '(', ')', '?'].some(v => path.includes(v))
}

/*
  tf-side-top-tab 布局
  返回当前需要的菜单
  menus: 后端返回的菜单
  menuList: 前端配置的路由菜单
*/
export const getSideTopTabLayoutMenus = ({
  menus,
  location: { pathname },
  dispatch
}, menuList) => {
  // 使用本地路由配置的菜单
  if (!menuRemote) {
    let localMenus = handleMenus(menuList);
    let pos = getPosAtMenus(pathname);

    if (menus.length === 0) { // 只dispatch一次, 防止死循环
      dispatch({ // 更新menus
        type: 'global/fetchMenus',
        payload: localMenus
      })
    }

    return localMenus[pos].children
  }

  // ps: 如果使用了远程菜单, 在业务逻辑中已经调用了handleMenus, 是否统一在这里调用会好些??

  // 后端菜单还未返回
  if (menus.length === 0) {
    return [];
  }

  let pos = getPosAtMenus(pathname)

  // 只使用远程菜单, 不合并本地菜单配置
  if (onlyRemote) {
    return menus[pos].children;
  }

  // 取得合并后的菜单, 合并name, icon, hideInMenu, hideChildrenInMenu等属性
  // 使用缓存, 防止重复计算
  return getCachedMergeMenus(menus[pos].children, menuList, pos)
}

/*
  该方法只是对getSideTopTabLayoutMenus方法做了一个代理:
    如果当前返回的菜单为空, 我们就返回上一次的菜单, 如果上一次的还是空, 我们就返回第一个有菜单的项

  作用是: 如果访问: 一进系统就存在的标签页面(defaultOpen配置), 而这个标签页面可能不属于任何一个模块, 它下面又没有子页面, 那么此时左侧菜单就是空的
*/
let sideTopTabLayoutMenus = (() => {
  let lastMenus = null; // 上一次的菜单

  return (...rest) => {
    let curMenus = getSideTopTabLayoutMenus(...rest)
    let [args, menuList] = rest

    if(!curMenus) {
      if (lastMenus) {
        curMenus = lastMenus
      } else { // 上一次的也是空
        let index = menuList.findIndex(v =>
          !v.hideInMenu && v[fChildren] // 不在菜单中隐藏 且 有子节点
        )

        if (index > -1) {
          let pathname = getHomePage(index).path // 取得主页
          // 替换pathname, 这样getSideTopTabLayoutMenus就能获取到该主页所在菜单
          args = { ...args, location: {pathname} }

          curMenus = getSideTopTabLayoutMenus(args, menuList)
          lastMenus = curMenus
        }
      }
    } else {
      lastMenus = curMenus
    }

    return curMenus;
  }
})()

function sideTabLayoutMenus() {

}

// ant-pro布局
function antProLayoutMenus({ menus,dispatch }, menuList) {
  if (!menuRemote) { // 本地
    handleMenus(menuList); // 用来判断页面是否有权限

    if (menus.length === 0) { // 只dispatch一次, 防止死循环
      dispatch({ // 更新menus
        type: 'global/fetchMenus',
        payload: menuList
      })
    }

    return menuList
  }

  // 后端菜单还未返回
  if (menus.length === 0) {
    return [];
  }

  // 只使用远程菜单, 不合并本地菜单配置
  if (onlyRemote) {
    return menus;
  }

  // 合并的菜单
  return getCachedMergeMenus(menus, menuList)
}

// 根据不同的布局返回不同的菜单
export default (...rest) => {
  switch(layout) {
    case 'tf-side-top-tab':
      return sideTopTabLayoutMenus(...rest)
    case 'tf-side-tab':
      return sideTabLayoutMenus(...rest)
    case 'tf-sidemenu-tab':
      return antProLayoutMenus(...rest)
    default:
      return antProLayoutMenus(...rest)
  }
}
