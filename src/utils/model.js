import modelExtend from 'dva-model-extend';
import { getPath } from './menu'

const _cached = {};
let _app = null;
let _curUrl = '';
let _history = null;

const _seps = ['@@', '@@']
export const matchReg = new RegExp(`^([a-zA-Z0-9\-\_]+)${_seps[0]}(.*)${_seps[1]}$`)

// 是否自动生成的namespace
export function matchAutoNS(ns) {
  return matchReg.exec(ns)
}

// 重写app.model方法, 实现namespace注册时的监听
let _alreadyRewrite = false // 只重写一次
let _registerModel = null // 保存dva原有的注册model方法
export function rewriteModel(key, history) {
  let app = window.g_app;

  if (app && !_alreadyRewrite) {
    _alreadyRewrite = true;
    _registerModel = app.model;

    !_app && (_app = app)
    !_curUrl && (listen(history))

    app.model = function(model) { // 重写
      model = modelExtend(
        model,
        getBaseModel(model.namespace) // modelExtend要求必须传入namespace
      )
      registerModel(_curUrl, model)
    }
  } else if (_registerModel) {
    // umi中, 有类似_cached变量判断是否注册过, 所以如果卸载后重新加载页面, 还需要手动注册model
    let path = getPath(key)

    let cache = Object.keys(_cached)
      .map(v => _cached[v])
      .filter(v => v.isTemplate) // 找到模板model
      .find(v => v.path === path);

    if(cache) {
      let model = cache.model

      if (path !== key) { // 页面多开的情况
        let newNS = getNS(cache.ns, key);
        // 通过模板model生成新的model
        let newModel = modelExtend(model, { namespace: newNS });

        if (!_cached[newNS]) { // 注册
          _cached[newNS] = {
            ns: newNS,
            model: modelExtend(newModel),
            key, path,
          };

          _registerModel(newModel)

        }
      } else if(cache.destroy) { // 被销毁了, 重新注册
        cache.destroy = false;
        let m = modelExtend(cache.model)

        _registerModel(m) // 奇怪, 重新注册model后, state竟然不会重新初始化?
      }
    }
  }
}

// 添加重置(__reset)的reducer
const getBaseModel = (ns) => ({
  namespace: ns,

  reducers: {
    // 重置
    __reset(state, { payload = {} }) {
      return { ...state, ...payload }
    }
  }
})

// 注册model
function registerModel(key, model) {
  let path = getPath(key)
  let ns = model.namespace;

  if (!_cached[ns]) {
    _cached[ns] = {
      ns, key, path,
      // 这里之所以使用modelExtend重新生成一个model, 是因为需要用它作为模板
      // ps: 好像其实不需要使用modelExtend重新生成一个model, 因为在dva内部reducers, effects会复制一遍, 而state是不可变数据
      model: modelExtend(model),
      // model,
      isTemplate: true // 是否作为模板使用
    };
  }

  // 假设path是: /detail/:id,  key是: /detail/123, namespace是: demo
  // 此时_cached会新增2条记录: _cached['demo'] = {...} 和 _cached['demo@@detail123@@'] = {...},
  // 其中_cached['demo']会作为模板, 供后续注册model使用
  // ps: _cached会新增2条, 但app.model仍只会注册一次
  if (path && path !== key) {
    let newNS = getNS(ns, key);
    let newModel = modelExtend(model, { namespace: newNS });

    if (!_cached[newNS]) {
      _cached[newNS] = {
        ns: newNS,
        key, path,
        model: modelExtend(newModel),
        // isTemplate: false // 可以不要
      };
      _registerModel(newModel)
    }
  } else {
    _registerModel(model)
  }
}

// 监听路径变化
function listen(history) {
  _history = history
  _curUrl = history.location.pathname;

  history.listen(({ pathname }) => {
    _curUrl = pathname;
  })
}

export function getNS(ns, key) {
  if (matchAutoNS(ns)) return ns;
  return ns + `${getKey(key)}`
}

export function getHistory() {
  return _history
}
export function getCurUrl() {
  return _curUrl
}

export function getKey(key) {
  return _seps[0] + key.replace(/\//g, '') + _seps[1]
}

// 获取真正的namespace
export function getRealNS(ns) {
  let newNS =  getNS(ns, _curUrl)
  if (_cached[newNS]) return newNS

  return ns
}

// 取得相关缓存信息
export function getCachedByKey(key) {
  let arr = []; // 一个页面可以同时注册多个model
  let path = getPath(key)
  let isEqual = path === key;

  for(let ns in _cached) {
    let cache = _cached[ns]

    if (isEqual && cache.key === key) {
      arr.push(cache)
    }
    if (!isEqual && matchAutoNS(cache.ns)
      && cache.key === key) {
      arr.push(cache)
    }
  }

  return arr;
}

// 注销model
export function unmodel(key) {
  if (_app) {
    let cached = getCachedByKey(key)

    cached.forEach(item => {
      /* https://dvajs.com/api/#app-unmodel-namespace
         app.unmodel只会清理reducers, effects 和 subscriptions,
         而state会保留, 就算重新注册model, state也是原来的 ???
      */
      _app._store.dispatch({ // 手动重置state
        type: `${item.ns}/__reset`,
        payload: item.model.state
      })
      _app.unmodel(item.ns);

      if (!item.isTemplate) { // 不是作为模板的才删除
        _cached[item.ns] = null
        delete _cached[item.ns]
      } else { // 是模板的, 标记被销毁了
        item.destroy = true
      }
    })

    cached = null;
  }
}

// 重置model
export function resetModel(key) {
  if (_app) {
    let cached = getCachedByKey(key)

    cached.forEach(item => {
      _app._store.dispatch({ // 手动重置state
        type: `${item.ns}/__reset`,
        payload: item.model.state
      })
    })

    cached = null;
  }
}
