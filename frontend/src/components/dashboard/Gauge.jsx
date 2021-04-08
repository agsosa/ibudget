/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Gauge } from "@ant-design/charts";
import tw from "twin.macro";

const Responsive = tw.div`w-full max-w-md `;
const Status = tw.text`text-black text-center font-bold text-xl`;
const Description = tw.text`text-gray-600 text-center text-sm`;
const TextContainer = tw.span`flex flex-col -mt-24`;

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
      <TextContainer>
        <Status>Excelente</Status>
        <Description>Capacidad de ahorro</Description>
      </TextContainer>
    </Responsive>
  );
};

export default DemoGauge;
