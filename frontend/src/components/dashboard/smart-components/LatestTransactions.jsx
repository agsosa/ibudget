/*
  Smart component

  TODO: Remove hard coded slice limit 5. Add pagination or something

*/

import * as React from "react";
import TransactionList from "components/dashboard/TransactionList";
import { useSelector } from "react-redux";

function LatestTransactions() {
  const transactions = useSelector((state) => state.BudgetModel.transactions);

  // On Transaction click
  function handleTransactionClick(transaction) {
    console.log(`Clicked transaction ${transaction}`);
  }

  return (
    <TransactionList
      data={transactions.slice(0, 5)}
      onClick={handleTransactionClick}
    />
  );
}

export default LatestTransactions;
