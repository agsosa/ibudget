/* 
  TransactionList: Component to display the information of various or a single TransactionModel object

    Usage:
      <TransactionList data={[...]} />

    props:
      data: Array of TransactionModel objects to display
*/

/* eslint-disable camelcase */
import * as React from "react";
import tw, { styled } from "twin.macro";
import { PropTypes } from "prop-types";
import {
  getCategoryLabel,
  getMoneyDisplayString,
  getTransactionTypeSymbol,
} from "lib/Helpers";
import { TransactionTypeEnum } from "ibudget-shared";
import format from "date-fns/format";
import AddEditTransaction from "components/dashboard/smart-components/AddEditTransactionModal";
import CategoryIcon from "./CategoryIcon";

/* Start styled components */

const Item = tw.li`
w-full mx-auto border-b 
py-3 sm:py-2 px-2 mb-4
transition duration-500 ease-in-out
cursor-pointer
transform hover:scale-105`;

const ItemContentContainer = tw.div`
flex sm:grid sm:grid-cols-2 
sm:grid-rows-1 align-middle -ml-10 sm:ml-0`;

const List = tw.ul``;
const Amount = styled.text(({ isNegative }) => [
  tw`text-right`,
  isNegative ? tw`text-red-600` : tw`text-green-600`,
]);
const Date = tw.text`text-gray-500 text-right text-xs`;
const Category = tw.text`text-black text-base overflow-visible`;
const Concept = tw.text`text-gray-500 text-sm overflow-hidden`; // TODO: Shrink text
const FlexCol = tw.div`flex flex-col`;
const CategoryConceptContainer = tw(FlexCol)`ml-3 justify-center`;
const RightContainer = tw(FlexCol)`justify-self-end w-full`;
const LeftContainer = tw.div`flex flex-row ml-6 sm:ml-0`;

/* End styled components */

function TransactionItem({ data, onClick }) {
  const { category_id, concept, date, amount, type_id } = data;

  return (
    <Item onClick={onClick}>
      <ItemContentContainer>
        <LeftContainer>
          <CategoryIcon category={category_id} />
          <CategoryConceptContainer>
            <Category>{getCategoryLabel(category_id)}</Category>
            {concept && <Concept>{concept}</Concept>}
          </CategoryConceptContainer>
        </LeftContainer>
        <RightContainer>
          <Amount isNegative={type_id === TransactionTypeEnum.OUT}>
            {getTransactionTypeSymbol(type_id)}
            {getMoneyDisplayString(amount)}
          </Amount>
          <Date>{format(date, "dd-MM-yy")}</Date>
        </RightContainer>
      </ItemContentContainer>
    </Item>
  );
}

function TransactionList({ data, limit }) {
  const modalRef = React.useRef();
  const [clickedTransaction, setClickedTransaction] = React.useState(null); // Used to pass it to the edit modal via prop

  // Watch for clickedTransaction updates and toggle the modal
  React.useEffect(() => {
    if (clickedTransaction) modalRef.current.toggle();
  }, [clickedTransaction]);

  return (
    <>
      <List>
        {(data &&
          Array.isArray(data) &&
          data.slice(0, limit).map((item) => {
            return React.createElement(TransactionItem, {
              data: item,
              onClick: () => {
                if (clickedTransaction === item) {
                  // If our clickedTransaction is the same as the clicked item, toggle the modal
                  // This is because React will not update clickedTransaction if it's unchanged, so we just need to open the modal
                  modalRef.current.toggle();
                } else setClickedTransaction(item); // else set it and wait for the update with useEffect then toggle the modal
              },
            });
          })) ||
          console.warn("TransactionList: Invalid data prop")}
      </List>
      <AddEditTransaction
        ref={modalRef}
        title="Edit Transaction"
        editMode
        transaction={clickedTransaction}
      />
    </>
  );
}

TransactionItem.defaultProps = {
  onClick: null,
};

TransactionItem.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

TransactionList.defaultProps = {
  data: null,
  limit: 5,
};

TransactionList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  limit: PropTypes.number,
};

export default TransactionList;
