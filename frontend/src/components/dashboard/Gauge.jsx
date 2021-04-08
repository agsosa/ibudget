/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Gauge } from "@ant-design/charts";
import tw from "twin.macro";

const Responsive = tw.div`w-full -my-10 max-w-md max-h-full max-h-screen text-white`;

const DemoGauge = () => {
  var [percent, setPercent] = useState(0);
  var ref;
  var ticks = [0, 1 / 3, 2 / 3, 1];
  var color = ["#F4664A", "#FAAD14", "#30BF78"];
  var config = {
    percent,
    style: {
      marginTop: "-20px",
    },
    range: {
      ticks: [0, 1],
      color: ["l(0) 0:#F4664A 0.5:#FAAD14 1:#30BF78"],
    },
    indicator: {
      pointer: { style: { stroke: "#D0D0D0" } },
      pin: { style: { stroke: "#D0D0D0" } },
    },
    statistic: {
      title: {
        formatter: function formatter(_ref) {
          var percent = _ref.percent;
          if (percent < ticks[1]) {
            return "Malo";
          }
          if (percent < ticks[2]) {
            return "Regular";
          }
          return "Excelente";
        },
        style: function style(_ref2) {
          var percent = _ref2.percent;
          return {
            marginTop: "35px",
            fontSize: "36px",
            lineHeight: 1,
            color:
              percent < ticks[1]
                ? color[0]
                : percent < ticks[2]
                ? color[1]
                : color[2],
          };
        },
      },
      content: {
        offsetY: 55,
        style: {
          zIndex: 0,
          fontSize: "20px",
          color: "#4B535E",
        },
        formatter: function formatter() {
          return "Capacidad de ahorro";
        },
      },
    },
  };

  useEffect(() => {
    var data = percent;
    var interval = setInterval(function () {
      if (data >= 1) {
        clearInterval(interval);
      }
      data += 0.1;
      setPercent(data);
    }, 1000);
  }, []);

  return (
    <Responsive>
      <Gauge {...config} chartRef={(chartRef) => (ref = chartRef)} />
    </Responsive>
  );
};

export default DemoGauge;
