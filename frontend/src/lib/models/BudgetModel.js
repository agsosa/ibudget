/* eslint-disable no-param-reassign */

import * as API from "lib/API";
import { NotificationTypeEnum } from "lib/Enums";
import { getTransactionAmountWithSign } from "lib/Helpers";

function parseTransactionFromServer(transaction) {
  transaction.date = new Date(transaction.date);
  transaction.amount = Number(transaction.amount);
}

/*
  BudgetModel
      { 
        transactions: Array of TransactionModel
      }

    reducers:
      setTransactions(payload) - replace the transactions array, payload should be an array of TransactionModel
      addTransaction(payload) - add a transaction to the array, payload should be a TransactionModel
      delTransaction(payload) - delete a transaction from the array, payload should be a ID (number)
      editTransaction(payload) - update a transaction on the array, payload should be a valid TransactionModel

    effects:
      fetchTransactions({callback: fn(result)}) - Fetch the transactions list from server
      createTransaction({transactionInfo: object ,callback: fn(result)}) - Create a new transaction on server
      deleteTransaction({id: number, callback: fn(result)}) - Delete a transaction on server
      updateTransaction({transactionInfo: object, id: number}) - Update a transaction on server

      >>> result is a object representing the server response. Shape { error: bool, message: string, data?: any }

    selectors:
      currentBalance() - Calculate the current balance taking in account all the transactions amount and type (in/out)
      transactionsFromSelectedPeriod() - Return the transactions array filtered by the period saved on UserPrefsModel state (fromDate-toDate)
*/
export default {
  name: "BudgetModel",
  state: {
    transactions: [],
  },
  reducers: {
    setTransactions(state, payload) {
      if (payload && Array.isArray(payload)) {
        payload.forEach(parseTransactionFromServer);

        return { ...state, transactions: payload };
      }
      return state;
    },
    addTransaction(state, payload) {
      if (payload && typeof payload === "object") {
        parseTransactionFromServer(payload);

        return { ...state, transactions: [...state.transactions, payload] };
      }

      return state;
    },
    delTransaction(state, payload) {
      if (payload && typeof payload === "number") {
        return {
          ...state,
          transactions: state.transactions.filter((q) => q.id !== payload),
        };
      }

      return state;
    },
    editTransaction(state, payload) {
      if (payload && typeof payload === "object") {
        parseTransactionFromServer(payload);

        return {
          ...state,
          transactions: state.transactions.map((q) => {
            if (q.id === payload.id) return payload;
            return q;
          }),
        };
      }

      return state;
    },
  },
  effects: (dispatch) => ({
    // TODO: Implement cache
    fetchTransactions(payload) {
      API.request("getTransactions").then((response) => {
        // Save response data
        if (!response.error && response.data) {
          this.setTransactions(response.data);
        }

        // Dispatch error notification
        if (response.error) {
          dispatch({
            type: "NotificationsQueueModel/pushNotification",
            payload: {
              type: NotificationTypeEnum.ERROR,
              message: "Error while synchronizing the data. Please try again.",
            },
          });
        }

        // Callback
        if (payload && payload.callback) payload.callback(response);
      });
    },
    createTransaction(payload) {
      API.request("createTransaction", payload.transactionInfo).then(
        (response) => {
          // Add the created transactions to the local state
          if (!response.error && response.data) {
            this.addTransaction(response.data);
          }

          // Dispatch notifications
          const type = "NotificationsQueueModel/pushNotification";
          if (response.error) {
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

          if (payload && payload.callback) payload.callback(response);
        }
      );
    },
    deleteTransaction(payload) {
      API.request("deleteTransaction", payload.id).then((response) => {
        // Update local list
        if (!response.error) {
          this.delTransaction(payload.id);
        }

        // Dispatch notifications
        const type = "NotificationsQueueModel/pushNotification";
        if (response.error) {
          dispatch({
            type,
            payload: {
              type: NotificationTypeEnum.ERROR,
              message:
                "Error while deleting the transaction. Please try again.",
            },
          });
        } else {
          dispatch({
            type,
            payload: {
              type: NotificationTypeEnum.SUCCESS,
              message: "The transaction was successfully deleted.",
            },
          });
        }

        // Callback
        if (payload && payload.callback) payload.callback(response);
      });
    },
    updateTransaction(payload) {
      API.request("updateTransaction", {
        id: payload.id,
        transactionInfo: payload.transactionInfo,
      }).then((response) => {
        // Update local list
        if (!response.error && response.data) {
          this.editTransaction(response.data);
        }

        // Dispatch notification
        const type = "NotificationsQueueModel/pushNotification";
        if (response.error) {
          dispatch({
            type,
            payload: {
              type: NotificationTypeEnum.ERROR,
              message:
                "Error while modifying the transaction. Please try again.",
            },
          });
        } else {
          dispatch({
            type,
            payload: {
              type: NotificationTypeEnum.SUCCESS,
              message: "The transaction was successfully modified.",
            },
          });
        }

        if (payload && payload.callback) payload.callback(response);
      });
    },
  }),
  selectors: (slice, createSelector) => ({
    // Selector to get the current balance (sum of all transactions amount field, depending on transaction type)
    currentBalance() {
      const sumTransaction = (a, b) => a + getTransactionAmountWithSign(b);

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
