/*
  TransactionModel
    shape:
      {
        id
        user_id: 
        concept: string
        amount: number
        date: date
        type: EnumTransactionType
        category: EnumCategory
        notes: string
      }
  
    methods:

*/
export const TransactionModel = {
  name: "TransactionModel",
  state: {
    id: null,
    user_id: null,
    concept: null,
    amount: null,
    date: null,
    type: null,
    category: null,
    notes: null,
  },
  CONCEPT_MAX_CHARS: 25, // max TransactionModel's concept field length
  NOTES_MAX_CHARS: 50, // max TransactionModel's notes field length
  AMOUNT_MIN_NUMBER: 0.01,
  AMOUNT_MAX_NUMBER: 1000000000, // max TransactionModel's amount field number
  AMOUNT_MAX_DECIMALS: 3,
};

/*
  BudgetModel
    shape:
      { 
        transactions: Array of TransactionModel
      }

    methods:
*/
export const BudgetModel = {
  name: "BudgetModel",
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
