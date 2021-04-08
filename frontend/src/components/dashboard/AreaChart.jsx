/* eslint-disable react/jsx-props-no-spreading */

import * as React from "react";
import { Area } from "@ant-design/charts";

function Chart() {
  const [data, setData] = React.useState([]);

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };

  React.useEffect(() => {
    asyncFetch();
  }, []);

  const config = {
    data,
    areaStyle: { fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff" },
    xField: "Date",
    yField: "scales",
    xAxis: { tickCount: 5 },
    slider: {
      start: 0,
      end: 1,
      trendCfg: { isArea: true },
    },
  };

  return <Area {...config} />;
}

export default React.memo(Chart);
