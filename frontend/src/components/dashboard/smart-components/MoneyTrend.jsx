/*
  Smart component (Interacting with BudgetModel, UserPrefsModel)

  Component to display the balance historial (BudgetModel) for a date range (UserPrefsModel) on a chart

  Usage:
    <MoneyTrend />
*/

import * as React from "react";
import Chart from "components/dashboard/charts/AreaChart";
import { useSelector } from "react-redux";
import store from "lib/Store";
import lightFormat from "date-fns/lightFormat";
import { TransactionTypeEnum } from "ibudget-shared";
import NoDataIndicator from "components/misc/NoDataIndicator";

function MoneyTrend() {
  // Get transactions with selected period from store
  const selection = store.select((models) => ({
    transactions: models.BudgetModel.transactionsFromSelectedPeriod,
  }));

  const { transactions } = useSelector(selection);

  if (transactions && transactions.length >= 1) {
    /* Build chartData array:
    our chartData array should contain objects with the shape {date: string, balance: number}
    each object in chartData will represent the balance at a given date. It will only contain 1 record for each date!
  */
    const chartData = [];
    let balance = 0; // Used to accumulate the balance while looping through all transactions, it will be assigned to each object in chartData

    const buildChartData = (transaction) => {
      const fTransactionDate = lightFormat(transaction.date, "dd/MM/yy"); // Need this format to be compatible with ant-design charts!

      // Accumulate our transaction.amount using the balance variable
      balance =
        transaction.type_id === TransactionTypeEnum.OUT
          ? balance - transaction.amount
          : balance + transaction.amount;

      // Check if we already added this fTransactionDate into chartData
      const current = chartData.find((r) => {
        return r.date === fTransactionDate;
      });

      // If we already registered the fTransactionDate in our chartData array, then assign the accumulated balance into its balance field
      // If not, push a new object containing this date into chartData array
      if (current) {
        current.balance = balance;
      } else chartData.push({ date: fTransactionDate, balance });
    };

    // Sort by date ascending and map the buildChartData function
    transactions
      .sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      })
      .map(buildChartData);

    return <Chart data={chartData} />;
  }

  return <NoDataIndicator />; // If we got an empty transactions array from the store
}

export default MoneyTrend;
