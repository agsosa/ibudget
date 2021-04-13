/* 
  Smart component (interacting with UserPrefsModel, BudgetModel)

  Component to analyze the spending by category

  Usage:
    <Spending />
*/

import * as React from "react";
import tw, { styled } from "twin.macro";
import PieChart from "components/dashboard/charts/PieChart";
import store from "lib/Store";
import { useSelector } from "react-redux";
import { TransactionTypeEnum } from "lib/Enums";
import NoDataIndicator from "components/misc/NoDataIndicator";
import { getMoneyDisplayString, getCategoryLabel } from "lib/Helpers";

/* Start styled components */
const MoneySmall = styled.text(({ isNegative }) => [
  tw`w-full text-center text-xl font-bold`,
  isNegative ? tw`text-red-600` : tw`text-green-600`,
]);
const Description = tw.text`w-full text-gray-600 text-center text-sm mt-3`;
const Container = tw.div`w-full flex flex-col items-center -mt-2`;

/* End style components */

function Spending() {
  const selection = store.select((models) => ({
    periodLabel: models.UserPrefsModel.formattedSelectedPeriod,
    transactions: models.BudgetModel.transactionsFromSelectedPeriod,
  }));
  const { periodLabel, transactions } = useSelector(selection);

  const spending = transactions.reduce(
    (a, b) => (b.type_id === TransactionTypeEnum.OUT ? a + b.amount : a),
    0
  );

  if (transactions && transactions.length >= 1) {
    /* Build chartData array:
    our chartData array should contain objects with the shape {type: string, value: number}
    each object in chartData will represent the spending for a category. It will only contain 1 record for each category!
  */
    const chartData = [];

    const buildChartData = (transaction) => {
      if (transaction.type_id === TransactionTypeEnum.OUT) {
        // Check if we already added this category_id into chartData
        const current = chartData.find((r) => {
          return r.type === getCategoryLabel(transaction.category_id);
        });

        // If we already registered the category_id in our chartData array, then add the spending amount to its object
        // If not, push a new object containing this category id into chartData array
        if (current) {
          current.value += transaction.amount;
        } else
          chartData.push({
            type: getCategoryLabel(transaction.category_id),
            value: transaction.amount,
          });
      }
    };

    // map the buildChartData function
    transactions.map(buildChartData);

    return (
      <Container>
        <Description>{periodLabel}</Description>
        <MoneySmall isNegative>-{getMoneyDisplayString(spending)}</MoneySmall>
        <PieChart data={chartData} />
      </Container>
    );
  }

  return <NoDataIndicator />; // If we got an empty transactions array from the store
}

export default Spending;
