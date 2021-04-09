/* eslint-disable react/jsx-props-no-spreading */

import { Pie } from "@ant-design/charts";
import tw from "twin.macro";

const Responsive = tw.div`w-full -my-10 max-w-md sm:mt-2`;

function PieChart() {
  const data = [
    {
      type: "Comida",
      value: 100,
    },
    {
      type: "Cine",
      value: 25,
    },
    {
      type: "Transporte",
      value: 18,
    },
    {
      type: "Hijo",
      value: 15,
    },
    {
      type: "Utilitarios",
      value: 10,
    },
    {
      type: "Otros",
      value: 5,
    },
  ];

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: function content(_ref) {
        const { percent } = _ref;
        return "".concat((percent * 100).toFixed(0), "%");
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

export default PieChart;
