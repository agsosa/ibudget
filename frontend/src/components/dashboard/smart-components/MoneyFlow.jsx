import * as React from "react";
import tw, { styled } from "twin.macro";
import Gauge from "components/dashboard/charts/Gauge";
import store from "lib/Store";
import { useSelector } from "react-redux";
import { TransactionTypeEnum } from "lib/Enums";
import { getMoneyDisplayString } from "lib/Helpers";
import NoDataIndicator from "components/misc/NoDataIndicator";

/* Start styled components */

const MoneySmall = styled.text(({ isNegative }) => [
  tw`w-full text-center text-xl font-bold`,
  isNegative ? tw`text-red-600` : tw`text-green-600`,
]);
const Description = tw.text`w-full text-gray-600 text-center text-sm mt-3`;
const Container = tw.div`w-full flex flex-col items-center -mt-2`; // TODO: This component is repeating, make a common styled js file
const FlowContainer = tw(Container)`lg:flex-row -mb-5 sm:mb-0 mt-2 `;

/* End style components */

function MoneyFlow() {
  const selection = store.select((models) => ({
    periodLabel: models.UserPrefsModel.formattedSelectedPeriod,
    transactions: models.BudgetModel.transactionsFromSelectedPeriod,
  }));
  const { periodLabel, transactions } = useSelector(selection);

  const spending = transactions.reduce(
    (a, b) => (b.type_id === TransactionTypeEnum.OUT ? a + b.amount : a),
    0
  );
  const income = transactions.reduce(
    (a, b) => (b.type_id === TransactionTypeEnum.IN ? a + b.amount : a),
    0
  );
  const flow = transactions.reduce(
    (a, b) =>
      b.type_id === TransactionTypeEnum.OUT ? a - b.amount : a + b.amount,
    0
  );

  if (transactions && transactions.length >= 1) {
    return (
      <Container>
        <FlowContainer>
          <Container>
            <Description>{periodLabel}</Description>
            <MoneySmall isNegative={flow < 0}>
              {flow < 0 ? "-" : "+"}
              {getMoneyDisplayString(Math.abs(flow))}
            </MoneySmall>
          </Container>
          <Container>
            <Description>Ingresos</Description>
            <MoneySmall>+{getMoneyDisplayString(Math.abs(income))}</MoneySmall>
          </Container>
          <Container>
            <Description>Egresos</Description>
            <MoneySmall isNegative>
              -{getMoneyDisplayString(Math.abs(spending))}
            </MoneySmall>
          </Container>
        </FlowContainer>
        <Gauge
          description="Capacidad de ahorro"
          totalValue={income}
          measureValue={flow}
        />
      </Container>
    );
  }

  return <NoDataIndicator />;
}

export default MoneyFlow;
