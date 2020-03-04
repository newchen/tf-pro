import { queryMenus } from '@/services/global';
import { handleMenus } from '@/utils/'
import defaultSettings from '../../config/defaultSettings'

const {
  menu: { remote }
} = defaultSettings

const GlobalModel = {
  namespace: 'global',
  state: {
    collapsed: false,
    menus: [],
    menuLoaded: false // 菜单是否已经加载完成
  },
  effects: {
    // 获取菜单
    *fetchMenus({ payload = [] }, { call, put }) {
      if (!remote) { //只使用本地菜单
        yield put({
          type: 'update',
          payload: { menuLoaded: true, menus: payload }
        })

        return
      }

      // 获取远程菜单
      const data = yield call(queryMenus);

      yield put({
        type: 'update',
        payload: {
          menus: handleMenus(data.data),
          menuLoaded: true
        },
      });
    },

  },
  reducers: {
    changeLayoutCollapsed(
      state = { collapsed: true },
      { payload },
    ) {
      return { ...state, collapsed: payload };
    },

    update(state, { payload = {} }) {
      return { ...state, ...payload }
    }

  },
  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }) => {
        // ...
      });
    },
  },
};

export default GlobalModel;
