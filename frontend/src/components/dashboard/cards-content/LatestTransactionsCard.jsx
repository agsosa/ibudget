import * as React from "react";
import TransactionList from "components/dashboard/TransactionList";
import PropTypes from "prop-types";

function LatestTransactionCard({ data }) {
  // On Transaction click
  function handleTransactionClick(transaction) {
    console.log(`Clicked transaction ${transaction}`);
  }

  return (
    <TransactionList data={data.slice(0, 5)} onClick={handleTransactionClick} />
  );
}

LatestTransactionCard.defaultProps = {
  data: [],
};

LatestTransactionCard.propTypes = {
  data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default LatestTransactionCard;
