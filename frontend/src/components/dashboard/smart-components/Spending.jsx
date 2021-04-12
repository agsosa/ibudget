import * as React from "react";
import tw, { styled } from "twin.macro";
import PieChart from "components/dashboard/charts/PieChart";

/* Start styled components */
const MoneySmall = styled.text(({ isNegative }) => [
  tw`w-full text-center text-xl font-bold`,
  isNegative ? tw`text-red-600` : tw`text-green-600`,
]);
const Description = tw.text`w-full text-gray-600 text-center text-sm mt-3`;
const Container = tw.div`w-full flex flex-col items-center -mt-2`;

/* End style components */

function Spending() {
  return (
    <Container>
      <Description>Últimos 31 dias</Description>
      <MoneySmall isNegative>-$366.55,10</MoneySmall>
      <PieChart />
    </Container>
  );
}

export default Spending;
