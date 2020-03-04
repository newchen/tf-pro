export default {
  namespace: 'demo1',

  state: {
    text: 'demo1'
  },

  reducers: {
    update(state, { payload }) {
      return { ...state, text: payload }
    }
  }
}
