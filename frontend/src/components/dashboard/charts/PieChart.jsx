/* eslint-disable react/jsx-props-no-spreading */

import { Pie } from "@ant-design/charts";
import tw from "twin.macro";
import PropTypes from "prop-types";

const Responsive = tw.div`w-full -my-10 max-w-md sm:mt-2`;

function PieChart({ data }) {
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 1,
    label: {
      type: "inner",
      offset: "-30%",
      content: function content(_ref) {
        const { percent } = _ref;
        return percent > 0.01 ? "".concat((percent * 100).toFixed(0), "%") : "";
      },
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [{ type: "element-active" }],
  };
  return (
    <Responsive>
      <Pie {...config} />
    </Responsive>
  );
}

PieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ type: PropTypes.string, value: PropTypes.number })
  ).isRequired,
};

export default PieChart;
