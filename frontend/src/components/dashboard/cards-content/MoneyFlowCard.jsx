import * as React from "react";
import tw, { styled } from "twin.macro";
import Gauge from "components/dashboard/charts/Gauge";

/* Start styled components */

const MoneySmall = styled.text(({ isNegative }) => [
  tw`w-full text-center text-xl font-bold`,
  isNegative ? tw`text-red-600` : tw`text-green-600`,
]);
const Description = tw.text`w-full text-gray-600 text-center text-sm mt-3`;
const Container = tw.div`w-full flex flex-col items-center -mt-2`; // TODO: This component is repeating, make a common styled js file
const FlowContainer = tw(Container)`lg:flex-row -mb-5 sm:mb-0 mt-2 `;

/* End style components */

function MoneyFlowCard() {
  return (
    <Container>
      <FlowContainer>
        <Container>
          <Description>Últimos 31 dias</Description>
          <MoneySmall>+$366.55,10</MoneySmall>
        </Container>
        <Container>
          <Description>Ingresos</Description>
          <MoneySmall>+$366.55,10</MoneySmall>
        </Container>
        <Container>
          <Description>Egresos</Description>
          <MoneySmall isNegative>-$366.55,10</MoneySmall>
        </Container>
      </FlowContainer>
      <Gauge />
    </Container>
  );
}

export default MoneyFlowCard;
