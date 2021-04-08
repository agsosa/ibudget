/* eslint-disable */
import * as React from "react";
import tw, { styled } from "twin.macro";
import StatsIllustrationSrc from "treact/images/stats-illustration.svg";
import { GetCategorySvgIcon } from "./../../images/CategoryIcons";
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
const CategoryImage = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded-full bg-contain bg-no-repeat bg-orange-500 bg-center h-12 w-12 mr-4`,
]);

function TransactionItem() {
  return (
    <Item>
      <LeftContainer>
        <CategoryImage>
          {GetCategorySvgIcon(EnumCategory.SHOPPING)}
        </CategoryImage>
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

function Transaction({ children }) {
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

Transaction.Item = TransactionItem;

export default Transaction;
