// TODO: Move description label to props?

import React, { useState, useEffect } from "react";
import { Gauge } from "@ant-design/charts";
import tw, { styled } from "twin.macro";

/* Start styled components */

const Responsive = tw.div`w-full max-w-md `;
const Status = styled.text(({ percent }) => [
  tw`text-center font-bold text-xl`,
  percent < 1 / 3 && tw`text-red-600`,
  percent >= 1 / 3 && tw`text-orange-500`,
  percent >= 2 / 3 && tw`text-green-500`,
]);
const Description = tw.text`text-gray-600 text-center text-sm`;
const TextContainer = tw.span`flex flex-col -mt-24`;

/* End styled components */

function getStatusText(percent) {
  if (percent < 1 / 3) return "Malo";
  if (percent < 2 / 3) return "Regular";
  return "Excelente";
}

export default () => {
  const [percent, setPercent] = useState(0);

  const config = {
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
    let data = percent;
    const interval = setInterval(function () {
      if (data >= 1) {
        clearInterval(interval);
      }
      data += 0.1;
      setPercent(data);
    }, 700);
  }, []);

  return (
    <Responsive>
      <Gauge {...config} />
      <TextContainer>
        <Status percent={percent}>{getStatusText(percent)}</Status>
        <Description>Capacidad de ahorro</Description>
      </TextContainer>
    </Responsive>
  );
};
