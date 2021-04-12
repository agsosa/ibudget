import * as React from "react";
import { Area } from "@ant-design/charts";
import PropTypes from "prop-types";

// [ { Date: date, label: data }]

function Chart({ data }) {
  const config = {
    data,
    areaStyle: { fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff" },
    xField: "Date",
    yField: "Balance",
    xAxis: { tickCount: 5 },
    slider: {
      start: 0,
      end: 1,
      trendCfg: { isArea: true },
    },
  };

  return <Area {...config} />;
}

Chart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ Date: PropTypes.date, Balance: PropTypes.Number })
  ).isRequired,
};

export default React.memo(Chart);
