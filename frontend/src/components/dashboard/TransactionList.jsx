// TODO: WIP

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

const Item = tw.li`w-full border-b flex sm:grid sm:grid-cols-2 sm:grid-rows-1 align-middle pb-3 mt-1 mb-5`;
const List = tw.ul``; //md:grid md:grid-cols-2 md:grid-rows-5 md:gap-5
const Amount = styled.text(({ isNegative }) => [
  tw`sm:text-right`,
  isNegative ? tw`text-red-600` : tw`text-green-600`,
]);
const Date = tw.text`text-gray-500 sm:text-right text-xs`;
const Category = tw.text`text-black text-base hidden sm:flex`;
const Concept = tw.text`text-gray-500 text-sm hidden sm:flex`; // TODO: Shrink text
const FlexCol = tw.div`flex flex-col`;
const RightContainer = tw(FlexCol)`sm:justify-self-end ml-3 sm:ml-3`;
const LeftContainer = tw.div`flex flex-row justify-self-start ml-5 sm:ml-0`;

function TransactionItem({ category }) {
  return (
    <Item>
      <LeftContainer>
        <CategoryIcon category={category} />
        <FlexCol>
          <Category>{category}</Category>
          <Concept>Varios</Concept>
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
  console.log(children);
  function viewTransactionDetails(id) {
    console.log("transaction click");
  }

  const childrenArray = React.Children.map(children, (child, i) => {
    console.log(child);
    if (child) {
      return React.cloneElement(
        child,
        child.type === TransactionItem
          ? {
              onClick: viewTransactionDetails(child.props.transactionId),
            }
          : {}
      );
    }
  });

  return <List>{childrenArray}</List>;
}

TransactionList.Item = TransactionItem;

export default TransactionList;
