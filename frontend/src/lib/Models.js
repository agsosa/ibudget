/* eslint-disable no-unused-vars */
import * as API from "lib/API";
import { subDays, subMonths } from "date-fns";
import { TransactionTypeEnum, PeriodEnum } from "./Enums";

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
  },
  effects: (dispatch) => ({
    // Get transactions from backend
    async fetchTransactions() {
      const response = await API.getTransactions();
      const { data, error } = response.data;

      if (!error && data) {
        // NOTE: The amount field of the transaction models is received as a string (it's a decimal), implement a decimal library to handle it if needed
        data.forEach((q) => {
          q.date = new Date(q.date); // eslint-disable-line no-param-reassign
          q.amount = Number(q.amount); // eslint-disable-line no-param-reassign
        });

        dispatch.BudgetModel.setTransactions(data);
      }
    },
    // TODO: Implement Delete, create, update
  }),
  selectors: (slice, createSelector, hasProps) => ({
    // Selector to get the current balance (sum of all transactions amount field, depending on transaction type)
    currentBalance() {
      const sumTransaction = (a, b) =>
        b.type_id === TransactionTypeEnum.OUT ? a - b.amount : a + b.amount;

      return slice((state) => state.transactions.reduce(sumTransaction, 0));
    },
    // Selector to get the transactions list from a date
    transactionsFromDate: hasProps(function (models, fromDate) {
      return slice((state) =>
        state.transactions.filter(
          (q) => q.date >= fromDate.setHours(0, 0, 0, 0)
        )
      );
    }),
  }),
};

/*
  UserPrefsModel
      { 
        selectedPeriod: value of PeriodEnum
        fromDate: js date
        toDate: js date
      }

    effects:

    selectors:

*/
export const UserPrefsModel = {
  name: "UserPrefsModel",
  state: {
    selectedPeriod: PeriodEnum.THIRTY_DAYS,
    fromDate: null,
    toDate: null,
  },
  reducers: {
    // Payload: { period: value of PeriodEnum, fromDate: should be a valid JS date if period is PeriodEnum.CUSTOM, toDate: same as fromDate}
    setSelectedPeriod(state, payload) {
      if (payload.period != null)
        if (Object.values(PeriodEnum).includes(payload.period)) {
          let fromDate;
          let toDate;

          switch (payload.period) {
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

          if (fromDate && toDate) {
            return {
              ...state,
              selectedPeriod: payload.period,
              fromDate,
              toDate,
            };
          }
        }

      return state;
    },
  },
  effects: (dispatch) => ({}),
  selectors: (slice, createSelector, hasProps) => ({}),
};
