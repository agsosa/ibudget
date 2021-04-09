/* 
  TransactionList: Component to display the information of various TransactionModel or a single TransactionModel object.

  Usage:
      <TransactionList>
        <Transaction.Item data={object of TransactionModel}/>
        <Transaction.Item data={object of TransactionModel} />
        ... etc
      </TransactionList>
    
    To display a single transaction:
      <TransactionList.Item data={object of TransactionModel} />

  TransactionItem onClick prop: callback that will be executed on click with the transaction object as parameter
*/

import * as React from "react";
import tw, { styled } from "twin.macro";
import { EnumCategory } from "lib/Enums";
import { PropTypes } from "prop-types";
import CategoryIcon from "./CategoryIcon";

/* Start styled components */
const Item = tw.li`
w-full border-b flex 
sm:grid sm:grid-cols-2 
sm:grid-rows-1 align-middle 
py-2 px-2 mt-1 mb-4
transition duration-700 ease-in-out
cursor-pointer
hocus:bg-primary-100`;

const List = tw.ul``;
const Amount = styled.text(({ isNegative }) => [
  tw`sm:text-right`,
  isNegative ? tw`text-red-600` : tw`text-green-600`,
]);
const Date = tw.text`text-gray-500 sm:text-right text-xs`;
const Category = tw.text`text-black text-base hidden sm:flex hocus:text-primary-500`;
const Concept = tw.text`text-gray-500 text-sm hidden sm:flex`; // TODO: Shrink text
const FlexCol = tw.div`flex flex-col`;
const RightContainer = tw(FlexCol)`sm:justify-self-end ml-3 sm:ml-3`;
const LeftContainer = tw.div`flex flex-row justify-self-start ml-5 sm:ml-0`;

/* End styled components */

function TransactionItem({ category, onClick }) {
  function handleClick() {
    console.log("on TransactionItem click");
    const transaction = { id: "test", category }; // TODO: Pass transaction prop
    if (onClick) onClick(transaction);
  }

  return (
    <Item onClick={handleClick}>
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
  return <List>{children}</List>;
}

TransactionList.Item = TransactionItem;

/* Start props validation */
TransactionItem.defaultProps = {
  onClick: null,
};

TransactionItem.propTypes = {
  category: PropTypes.oneOf(Object.values(EnumCategory)).isRequired,
  onClick: PropTypes.func,
};

TransactionList.defaultProps = {
  children: null,
};
TransactionList.propTypes = {
  children: PropTypes.node,
};

export default TransactionList;
