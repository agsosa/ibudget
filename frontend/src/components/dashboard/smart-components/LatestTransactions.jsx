/*
  Smart component (Interacting with BudgetModel)

  Display a list of the latest transactions.

  Usage:
    <LatestTransactions />

  props:
    limit: maximum amount of transactions to display (number, optional, default = 5)
*/

import * as React from "react";
import TransactionList from "components/dashboard/TransactionList";
import { useSelector } from "react-redux";
import { PropTypes } from "prop-types";
import { sortByField } from "lib/Helpers";

function LatestTransactions({ limit }) {
  const transactions = useSelector((state) => state.BudgetModel.transactions);

  // On Transaction click
  function handleTransactionClick(transaction) {
    // TODO: Implement via props or directly
    console.log(`Clicked transaction ${transaction}`);
  }

  return (
    <TransactionList
      data={transactions
        .sort((a, b) => sortByField(a, b, "id"))
        .slice(0, limit)}
      onClick={handleTransactionClick}
    />
  );
}

LatestTransactions.defaultProps = {
  limit: 5,
};

LatestTransactions.propTypes = {
  limit: PropTypes.number,
};

export default LatestTransactions;
