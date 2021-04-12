import * as React from "react";
import Chart from "components/dashboard/charts/AreaChart";
import { PropTypes } from "prop-types";

function MoneyTrend({ data }) {
  // Sumar todo el dinero en 1 date

  const chartData = data.map((q) => ({
    Date: q.date,
    Balance: q.amount,
  }));

  return <Chart data={chartData} />;
}

MoneyTrend.defaultProps = {
  data: [],
};

MoneyTrend.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default MoneyTrend;
