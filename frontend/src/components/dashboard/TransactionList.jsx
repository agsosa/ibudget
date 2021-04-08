/* 
  TransactionList: Component to display the information of various TransactionModel or a single TransactionModel object.

  Usage:
    To build the list automatically:
      <TransactionList data={array of TransactionModel} />

    To build the list manually:
      <Transaction>
        <Transaction.Item data={object of TransactionModel} />
      </Transaction>
    
    To display a single transaction:
      <TransactionList.Item data={object of TransactionModel} />
*/

/* eslint-disable */
import * as React from "react";
import tw, { styled } from "twin.macro";
import CategoryIcon from "./CategoryIcon";
import { EnumCategory } from "lib/Enums";

const Item = tw.li`w-full border-b grid grid-cols-2 grid-rows-1 align-middle pb-3`;
const List = tw.ul``;
const Amount = styled.text(({ isNegative }) => [
  tw`text-right`,
  isNegative ? tw`text-red-600` : tw`text-green-600`,
]);
const Date = tw.text`text-gray-500 text-right`;
const Category = tw.text`text-black`;
const Concept = tw.text`text-gray-500`;
const FlexCol = tw.div`flex flex-col`;
const RightContainer = tw(FlexCol)`justify-self-end`;
const LeftContainer = tw.div`flex flex-row justify-self-start`;

function TransactionItem({ category }) {
  return (
    <Item>
      <LeftContainer>
        <CategoryIcon category={category} />
        <FlexCol>
          <Category>Shopping</Category>
          <Concept>Efectivo</Concept>
        </FlexCol>
      </LeftContainer>
      <RightContainer>
        <Amount isNegative>-$500.230,50</Amount>
        <Date>4/21/2021, 10:00 PM</Date>
      </RightContainer>
    </Item>
  );
}

function TransactionList({ children }) {
  function viewTransactionDetails(id) {
    console.log("transaction click");
  }

  const childrenArray = React.Children.map(children, (child, i) => {
    return React.cloneElement(
      child,
      child.type === TransactionItem
        ? {
            onClick: viewTransactionDetails(child.props.transactionId),
          }
        : {}
    );
  });

  return <List>{childrenArray}</List>;
}

TransactionList.Item = TransactionItem;

export default TransactionList;
