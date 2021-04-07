/*
  TransactionModel
    id
    user_id: 
    concept: string
    amount: number
    creation_date: date
    modify_date: date
    type: EnumTransactionType
    category: EnumCategory
*/
// export const TransactionModel = {};

/*
  BudgetModel
    transactions: Array of TransactionModel
*/
export const BudgetModel = {
  state: { transactions: [] },
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
