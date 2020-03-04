import { queryCurrent } from '@/services/user';

export default {
  namespace: 'user',
  state: {
    currentUser: {}, // 用户信息
    isLogin: false // 是否登录
  },
  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);

      yield put({
        type: 'update',
        payload: response.data,
      });
    },
  },
  reducers: {
    update(state, { payload = {} }) {
      return {
        ...state,
        currentUser: payload,
        isLogin: payload && payload.userid // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
      };
    },
  },
};
