import * as React from "react";
import CardList from "components/misc/CardList";
import Chart from "components/dashboard/charts/AreaChart";

function MoneyTrendCard() {
  return (
    <CardList.Item title="Tendencia del saldo">
      <Chart />
    </CardList.Item>
  );
}

export default MoneyTrendCard;
