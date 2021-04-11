// TODO: Implement data prop for TransactionList.Item
// TODO: Implement onClick for TransactionList

/* 
  TransactionList: Component to display the information of various or a single TransactionModel object

    Usage:
      <TransactionList data={[...]} />

    props:
      data: Array of TransactionModel objects to display
*/

import * as React from "react";
import tw, { styled } from "twin.macro";
import { PropTypes } from "prop-types";
import { getCategoryLabel } from "lib/Helpers";
import { TransactionModel } from "lib/Models";
import CategoryIcon from "./CategoryIcon";

/* Start styled components */

const Item = tw.li`
w-full mx-auto border-b 
py-3 sm:py-2 px-2 mb-4
transition duration-700 ease-in-out
cursor-pointer
hocus:bg-primary-100`;

const ItemContentContainer = tw.div`
flex justify-center sm:grid sm:grid-cols-2 
sm:grid-rows-1 align-middle -ml-10 sm:ml-0`;

const List = tw.ul``;
const Amount = styled.text(({ isNegative }) => [
  tw`sm:text-right`,
  isNegative ? tw`text-red-600` : tw`text-green-600`,
]);
const Date = tw.text`text-gray-500 sm:text-right text-xs`;
const Category = tw.text`text-black text-base hidden sm:flex hocus:text-primary-500`;
const Concept = tw.text`text-gray-500 text-sm hidden sm:flex`; // TODO: Shrink text
const FlexCol = tw.div`flex flex-col`;
const RightContainer = tw(FlexCol)`sm:justify-self-end `;
const LeftContainer = tw.div`flex flex-row justify-self-start ml-5 sm:ml-0`;

/* End styled components */

function TransactionItem({ data, onClick }) {
  return (
    <Item onClick={onClick}>
      <ItemContentContainer>
        <LeftContainer>
          <CategoryIcon category={data.category_id} />
          <FlexCol>
            <Category>{getCategoryLabel(data.category_id)}</Category>
            <Concept>Varios</Concept>
          </FlexCol>
        </LeftContainer>
        <RightContainer>
          <Amount isNegative>-$500.230,50</Amount>
          <Date>4/21/2021, 10:00 PM</Date>
        </RightContainer>
      </ItemContentContainer>
    </Item>
  );
}

function TransactionList({ data }) {
  return (
    <List>
      {(data &&
        Array.isArray(data) &&
        data.map((item) => {
          return React.createElement(TransactionItem, {
            data: item,
            onClick: () => {
              console.log("test"); // TODO: Implement
            },
          });
        })) ||
        console.warn("TransactionList: Invalid data prop")}
    </List>
  );
}

TransactionItem.defaultProps = {
  onClick: null,
};

TransactionItem.propTypes = {
  data: PropTypes.objectOf(TransactionModel.state).isRequired,
  onClick: PropTypes.func,
};

TransactionList.defaultProps = {
  data: null,
};
TransactionList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf(TransactionModel.state)),
};

export default TransactionList;
