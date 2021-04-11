import * as React from "react";
import TransactionList from "components/dashboard/TransactionList";
import { CategoryEnum } from "lib/Enums";
import CardList from "components/misc/CardList";

function LatestTransactionCard() {
  // On View More click
  function handleLastTransactionsViewMore() {
    console.log("handleLastTransactionsViewMore");
  }

  // On Transaction click
  function handleTransactionClick(transaction) {
    console.log(`Clicked transaction ${transaction}`);
  }

  return (
    <CardList.Item
      title="Últimas transacciones"
      onViewMoreClick={handleLastTransactionsViewMore}
    >
      <TransactionList
        data={Object.values(CategoryEnum)
          .slice(0, 5)
          .map((v) => ({ category_id: v }))}
        onClick={handleTransactionClick}
      />
    </CardList.Item>
  );
}

export default LatestTransactionCard;
