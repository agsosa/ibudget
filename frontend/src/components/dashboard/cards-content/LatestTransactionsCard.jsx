import * as React from "react";
import TransactionList from "components/dashboard/TransactionList";
import { CategoryEnum } from "lib/Enums";

function LatestTransactionCard() {
  // On Transaction click
  function handleTransactionClick(transaction) {
    console.log(`Clicked transaction ${transaction}`);
  }

  return (
    <TransactionList
      data={Object.values(CategoryEnum)
        .slice(0, 5)
        .map((v) => ({ category_id: v }))}
      onClick={handleTransactionClick}
    />
  );
}

export default LatestTransactionCard;
