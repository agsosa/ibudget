/*
  Smart component

*/

import * as React from "react";
import TransactionList from "components/dashboard/TransactionList";
import { useSelector } from "react-redux";
import { PropTypes } from "prop-types";

function LatestTransactions({ limit }) {
  const transactions = useSelector((state) => state.BudgetModel.transactions);

  // On Transaction click
  function handleTransactionClick(transaction) {
    console.log(`Clicked transaction ${transaction}`);
  }

  return (
    <TransactionList
      data={transactions.slice(0, limit)}
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
