/*
  TransactionModel
    shape:
      {
        id
        user_id: 
        concept: string
        amount: number
        date: date // date input by user
        created_at: date
        updated_at: date
        type_id: TransactionTypeEnum
        category_id: CategoryEnum
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
    created_at: null,
    updated_at: null,
    type_id: null,
    category_id: null,
    notes: null,
  },
  CONCEPT_MAX_CHARS: 25, // max TransactionModel's concept field length
  NOTES_MAX_CHARS: 100, // max TransactionModel's notes field length
  AMOUNT_MIN_NUMBER: 0.01,
  AMOUNT_MAX_NUMBER: 1000000000, // max TransactionModel's amount field number
  AMOUNT_MAX_DECIMALS: 2,
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
