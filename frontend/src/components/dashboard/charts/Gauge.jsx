/* 


GaugeImpl.propTypes = {
  description: PropTypes.string,
  totalValue: PropTypes.number.isRequired,
  measureValue: PropTypes.number.isRequired,
};

*/

import * as React from "react";
import { Gauge } from "@ant-design/charts";
import tw, { styled } from "twin.macro";
import PropTypes from "prop-types";

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

function GaugeImpl({ description, totalValue, measureValue }) {
  const [percent, setPercent] = React.useState(0);

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

  React.useEffect(() => {
    const goalPercent = totalValue > 0 ? measureValue / totalValue : 0.01;
    setPercent(goalPercent);
  }, [totalValue, measureValue]);

  return (
    <Responsive>
      <Gauge {...config} />
      <TextContainer>
        <Status percent={percent}>{getStatusText(percent)}</Status>
        {description && <Description>{description}</Description>}
      </TextContainer>
    </Responsive>
  );
}

GaugeImpl.defaultProps = {
  description: "",
};

GaugeImpl.propTypes = {
  description: PropTypes.string,
  totalValue: PropTypes.number.isRequired,
  measureValue: PropTypes.number.isRequired,
};

export default GaugeImpl;
