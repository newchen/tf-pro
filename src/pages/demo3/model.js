export default {
  namespace: 'demo3',

  state: {
    text: 'demo3'
  },

  reducers: {
    update(state, { payload }) {
      return { ...state, text: payload }
    }
  }
}
