/* eslint-disable no-unused-vars */
/* eslint-disable */

// TODO: Add cache to effects

// TODO: Separate each model to files and export from models/index

import * as API from "lib/API";
import { subDays, subMonths, format } from "date-fns";
import { getPeriodLabel } from "lib/Helpers";
import { TransactionTypeEnum, PeriodEnum } from "./Enums";
import { NotificationTypeEnum } from "lib/Enums";

// TODO: Remove
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
  // TODO: Move the limits to shared library
  CONCEPT_MAX_CHARS: 25, // max TransactionModel's concept field length
  NOTES_MAX_CHARS: 100, // max TransactionModel's notes field length
  AMOUNT_MIN_NUMBER: 0.01,
  AMOUNT_MAX_NUMBER: 1000000000, // max TransactionModel's amount field number
  AMOUNT_MAX_DECIMALS: 2,
};

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
export const BudgetModel = {
  name: "BudgetModel",
  state: {
    transactions: [],
  },
  reducers: {
    // Set the transactions array
    setTransactions(state, payload) {
      return Array.isArray(payload)
        ? { ...state, transactions: payload }
        : state;
    },
    addTransaction(state, payload) {
      // TODO: Add payload validation
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
          if (payload && payload.callback) payload.callback(result);
        });
    },
    createTransaction(payload) {
      API.request("createTransaction", payload.transactionInfo)
        .then((response) => {
          const { data, error } = response;

          if (!error && data) {
            data.forEach((q) => {
              q.date = new Date(q.date); // eslint-disable-line no-param-reassign
              q.amount = Number(q.amount); // eslint-disable-line no-param-reassign
            });

            this.addTransaction(data);
          }

          return response;
        })
        .catch((error) => error)
        .then((result) => {
          if (payload && payload.callback) payload.callback(result);
        });
    },
    // TODO: Implement Delete,  update
  }),
  selectors: (slice, createSelector, hasProps) => ({
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

/*
  UserPrefsModel
      { 
        selectedPeriod: value of PeriodEnum
        fromDate: js date
        toDate: js date
      }

    reducers:
      setSelectedPeriod(payload)
        Payload: { selectedPeriod: value of PeriodEnum, fromDate: should be a valid JS date if period is PeriodEnum.CUSTOM, toDate: same as fromDate}
        Update selectedPeriod, fromDate and toDate fields. fromDate and toDate will be calculated depending on the passed selectedPeriod via payload.

    selectors:
      formattedSelectedPeriod: Selector to get the current selected period label (string) 
                                (for selectedPeriod = PeriodEnum.CUSTOM it will return something like "11/04/2021 - 12/04/2021")

*/
export const UserPrefsModel = {
  name: "UserPrefsModel",
  state: {
    selectedPeriod: PeriodEnum.THIRTY_DAYS,
    fromDate: null,
    toDate: null,
  },
  reducers: {
    setSelectedPeriod(state, payload) {
      if (payload.selectedPeriod != null)
        if (Object.values(PeriodEnum).includes(payload.selectedPeriod)) {
          let fromDate;
          let toDate;

          // Set fromDate and toDate
          switch (payload.selectedPeriod) {
            case PeriodEnum.SEVEN_DAYS:
              fromDate = subDays(new Date(), 7);
              toDate = new Date();
              break;
            case PeriodEnum.THIRTY_DAYS:
              fromDate = subDays(new Date(), 30);
              toDate = new Date();
              break;
            case PeriodEnum.NINETY_DAYS:
              fromDate = subDays(new Date(), 90);
              toDate = new Date();
              break;
            case PeriodEnum.TWELVE_MONTHS:
              fromDate = subMonths(new Date(), 12);
              toDate = new Date();
              break;
            case PeriodEnum.CUSTOM:
              // If the selected period is custom, we want to use the provided fromDate and toDate via the payload parameter
              if (payload.fromDate && payload.toDate) {
                if (fromDate >= toDate) {
                  const aux = toDate;
                  fromDate = toDate;
                  toDate = aux;
                }

                fromDate = payload.fromDate;
                toDate = payload.toDate;
              }
              break;
            default:
              return state;
          }

          // Save state if the calculated fromDate and toDate are valid
          if (fromDate && toDate) {
            return {
              ...state,
              selectedPeriod: payload.selectedPeriod,
              fromDate,
              toDate,
            };
          }
        }

      return state;
    },
  },
  effects: (dispatch) => ({}),
  selectors: (slice, createSelector, hasProps) => ({
    formattedSelectedPeriod() {
      return createSelector(slice, (state) => {
        if (
          state.selectedPeriod === PeriodEnum.CUSTOM &&
          state.fromDate &&
          state.toDate
        ) {
          const fromDateFormatted = format(state.fromDate, "dd/MM/yy");
          const toDateFormatted = format(state.toDate, "dd/MM/yy");
          return `${fromDateFormatted} - ${toDateFormatted}`;
        }

        return getPeriodLabel(state.selectedPeriod);
      });
    },
  }),
};

/*
  NotificationsQueueModel (Consumed by NotificationQueueController)

  To display a toast notification.

  Notification object:{ type: value of NotificationTypeEnum, message: string to display }

  Usage:
    Dispatch "pushNotification" with a Notification object as payload
*/
export const NotificationsQueueModel = {
  name: "NotificationsQueueModel",
  state: {
    notifications: [], // Array of Notification object
  },
  reducers: {
    // Display a notification. Payload should be a Notification object
    pushNotification(state, payload) {
      if (
        payload &&
        Object.values(NotificationTypeEnum).includes(payload.type) &&
        payload.message
      ) {
        return { ...state, notifications: [...state.notifications, payload] };
      }

      return state;
    },
    // Used by NotificationQueueController after consuming all the notifications
    clearNotifications(state) {
      return {
        ...state,
        notifications: [],
      };
    },
  },
};
