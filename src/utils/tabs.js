
import { getName as getMenuName } from '@/utils/menu'
import { unmodel, getHistory, getCurUrl, resetModel } from './model'
import defaultSettings from '../../config/defaultSettings'
import { message } from 'antd';

let {
  tabs: {
    max: maxTabs,
    min: minTabs,
    defaultOpen
  }
} = defaultSettings

// 所有已打开的, 一个tab有: name, key, content, closable 等属性
let allOpenTabs = [ ...defaultOpen ];

let cachedNamesMap = {} // 缓存的tab标题
let isRefresh = false; // 是否是刷新操作

export function getAllOpenTabs(key, content) {
  let index = allOpenTabs.findIndex(v => v.key === key)

  if (index === -1 && key /*&& content*/) { // 新增
    allOpenTabs.push({
      name: getName(key),
      key,
      content
    })
  }
  if(index > -1  // 添加页面内容
      && !allOpenTabs[index].content
      && content
      && !isRefresh) { // 不是刷新操作, 而是页面跳转
    allOpenTabs[index].content = content
  }

  isRefresh = false;
  return allOpenTabs
}

// 获取标题
export function getName(key) {
  return cachedNamesMap[key]
    || getMenuName(key)
    || '未知的标题'
}
export { getName as getTitle }

// 设置标题
export function setName(key, name) {
  if (typeof key === 'object') {
    key = key.pathname
  }
  if (key && name) {
    cachedNamesMap[key] = name
  }
}
export { setName as setTitle }

// 已经打开了多少个tabs
export function getCount() {
  return allOpenTabs.length
}

// 销毁某个页面和注销相关model
function destory(key) {
  let index = allOpenTabs.findIndex(v => v.key === key);

  if (index > -1) {
    allOpenTabs.splice(index, 1)
  }

  // 奇怪: unmodel会导致重新加载一次当前页面, 然后上面allOpenTabs删除的又回来了, 需加上setTimeout延迟
  // unmodel(key)
  setTimeout(() => unmodel(key), 300)
}

function getNextKey(key) {
  let newKey = key
  let len = allOpenTabs.length - 1;
  let index = allOpenTabs.findIndex(v => v.key === key);

  // 模拟浏览器行为
  if (index >= len) {
    newKey = allOpenTabs[len - 1].key;
  } else {
    newKey = allOpenTabs[index + 1].key;
  }

  return newKey
}
/**
 * 移除
 * @param {string} key  要移除的标签页
 * @param {string} toKey 可选, 移除后, 跳到该标签页
 */
export function remove(key, toKey) {
  let count = getCount()

  if (count <= minTabs.count) {
    message.warn(minTabs.msg)
  } else {
    if (!toKey) {
      toKey = getNextKey(key)
    }

    destory(key)
    jumpTo(toKey);
    // setTimeout(() => destory(key))
  }
}

/**
 * 刷新
 * @param {string} key 可选, 要刷新的标签页, 如果不填, 默认刷新当前标签页
 */
export function refresh(key = getCurUrl()) {
  isRefresh = true;

  let index = allOpenTabs.findIndex(v => v.key === key);

  if (index > -1) {
    allOpenTabs[index].content = null // 删除页面内容

    // unmodel(key) // 删除model
    resetModel(key) // 重置model, 重置比删除更好些
    setTimeout(() => { jumpTo(key) });// 重新加载
  }
}

// 跳转到哪个
// name表示要设置的tab标题
export function jumpTo(key, name = '') {
  if (getCount() >= maxTabs.count) {
    message.warn(maxTabs.msg)
  } else {
    if(name) setName(key, name);
    getHistory().push(key)
  }
}
