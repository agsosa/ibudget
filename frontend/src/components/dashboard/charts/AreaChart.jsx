/*
  ant-design Area chart implementation
*/

import * as React from "react";
import { Area } from "@ant-design/charts";
import PropTypes from "prop-types";

function Chart({ data }) {
  const config = {
    data,
    areaStyle: { fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff" },
    xField: "date",
    yField: "balance",
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
