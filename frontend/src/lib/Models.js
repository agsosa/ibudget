export const count = {
  state: 0,
  reducers: {
    increment(state, payload) {
      return state + payload;
    },
  },
  effects: (dispatch) => ({
    async incrementAsync(payload) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch.count.increment(payload);
    },
  }),
};
