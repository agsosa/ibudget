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
import NoDataIndicator from "components/misc/NoDataIndicator";

function LatestTransactions({ limit }) {
  const transactions = useSelector((state) => state.BudgetModel.transactions);

  // On Transaction click
  function handleTransactionClick(transaction) {
    // TODO: Implement via props or directly
    console.log(`Clicked transaction ${transaction}`);
  }

  if (transactions && transactions.length >= 1) {
    return (
      <TransactionList
        data={transactions
          .sort((a, b) => new Date(b.date) - new Date(a.date) || b.id - a.id)
          .slice(0, limit)}
        onClick={handleTransactionClick}
      />
    );
  }

  return <NoDataIndicator />;
}

LatestTransactions.defaultProps = {
  limit: 5,
};

LatestTransactions.propTypes = {
  limit: PropTypes.number,
};

export default LatestTransactions;
