import * as API from "lib/API";
import { NotificationTypeEnum } from "lib/Enums";
import { TransactionTypeEnum } from "ibudget-shared";

/*
  BudgetModel
      { 
        transactions: Array of TransactionModel
      }

    effects:
      async fetchTransactions() - Update the transactions array with the data from the server

    selectors:
      currentBalance() - Calculate the current balance taking in account all the transactions amount and type (in/out)
*/
export default {
  name: "BudgetModel",
  state: {
    transactions: [],
  },
  reducers: {
    setTransactions(state, payload) {
      return Array.isArray(payload)
        ? { ...state, transactions: payload }
        : state;
    },
    addTransaction(state, payload) {
      // TODO: Add payload validation
      console.log("entered addtransaction");
      console.log(Object.isObject(payload), payload);
      return Object.isObject(payload)
        ? { ...state, transactions: [...state.transactions, payload] }
        : state;
    },
  },
  effects: (dispatch) => ({
    /* 
      Get transactions from backend. 
      - Optional payload parameter { callback: function(result) } 
          callback will be a function called with a result object ({ error: boolean, message: string, data?: any })
          after the request promise is resolved/rejected
    */
    fetchTransactions(payload) {
      API.request("getTransactions")
        .then((response) => {
          const { data, error } = response;

          if (!error && data) {
            // NOTE: The amount field of the transaction models is received as a string (it's a decimal), implement a decimal library to handle it if needed
            data.forEach((q) => {
              q.date = new Date(q.date); // eslint-disable-line no-param-reassign
              q.amount = Number(q.amount); // eslint-disable-line no-param-reassign
            });

            this.setTransactions(data);
          }

          return response;
        })
        .catch((error) => error)
        .then((result) => {
          // Dispatch notification
          if (result.error) {
            dispatch({
              type: "NotificationsQueueModel/pushNotification",
              payload: {
                type: NotificationTypeEnum.ERROR,
                message:
                  "Error while synchronizing the data. Please try again.",
              },
            });
          }

          // Callback
          if (payload && payload.callback) payload.callback(result);
        });
    },
    createTransaction(payload) {
      API.request("createTransaction", payload.transactionInfo)
        .then((response) => {
          const { data, error } = response;

          if (!error && data) {
            data.date = new Date(data.date);
            data.amount = Number(data.amount);

            console.log("adding data ", data);
            this.addTransaction(data);
          }

          return response;
        })
        .catch((error) => error)
        .then((result) => {
          // Dispatch notification
          const type = "NotificationsQueueModel/pushNotification";
          if (result.error) {
            dispatch({
              type,
              payload: {
                type: NotificationTypeEnum.ERROR,
                message:
                  "Error while creating the transaction. Please try again.",
              },
            });
          } else {
            dispatch({
              type,
              payload: {
                type: NotificationTypeEnum.SUCCESS,
                message: "The transaction was successfully registered.",
              },
            });
          }

          if (payload && payload.callback) payload.callback(result);
        });
    },
    // TODO: Implement Delete,  update
  }),
  selectors: (slice, createSelector) => ({
    // Selector to get the current balance (sum of all transactions amount field, depending on transaction type)
    currentBalance() {
      const sumTransaction = (a, b) =>
        b.type_id === TransactionTypeEnum.OUT ? a - b.amount : a + b.amount;

      return slice((state) => state.transactions.reduce(sumTransaction, 0));
    },
    // Selector to get the transactions list filtered by date to be in the range of UserPrefsModel fromDate and toDate
    transactionsFromSelectedPeriod() {
      return createSelector(
        slice, // shortcut for (rootState) => rootState.BudgetModel
        (rootState) => rootState.UserPrefsModel,
        ({ transactions }, userPrefs) =>
          transactions.filter(
            (q) => q.date >= userPrefs.fromDate && q.date <= userPrefs.toDate
          )
      );
    },
  }),
};
