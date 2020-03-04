export default {
  namespace: 'demo2',

  state: {
    text: 'demo2'
  },

  reducers: {
    update(state, { payload }) {
      return { ...state, text: payload }
    }
  }
}
