/* 
  Cards components (list or individual)

  Usage:
    For a list of cards wrap every CardList.Item with <CardList></CardList>

      Props:
        - loading: To display a loading skeleton on every card item (bool, optional)

  CardList.Item:
    Can be used as a single card or inside CardList

      <CardList.Item>
        (content)
      </CardList.Item>

      CardList.Item Props:
        - title: to display a title (string, optional)
        - onViewMoreClick: enable a View More button (callback, optional)
        - loading: Display a loading skeleton (bool, optional)
*/

/* eslint-disable */
import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { PropTypes } from "prop-types";
import Skeleton from "react-loading-skeleton";

/* Start styled components */

const CardsContainer = tw.div`
  mt-10 items-center
  text-gray-900 font-medium 
  lg:items-stretch lg:justify-between
  lg:self-center lg:max-w-screen-xl lg:w-full
  lg:grid lg:gap-4 lg:grid-cols-2 
`;

const ViewMoreBtn = tw.button`
  mt-2 sm:mt-0
  text-primary-700 bg-primary-100 
  rounded-lg px-2 font-semibold
  hocus:bg-primary-200 hocus:text-primary-900 hocus:outline-none
  transition duration-500 ease-in-out
`;

const CardBlock = styled.div`
  ${tw`
   justify-self-center
  bg-white rounded-lg lg:w-full
  flex flex-col justify-between
  py-5 px-6
  sm:px-8 lg:px-6
  lg:py-8 xl:p-8
  mt-8 sm:mx-3 first:mt-0 lg:mt-0 
  shadow-sm
  shadow-raised`}
`;

const CardHeader = styled.div`
  .headerContainer {
    ${tw`flex flex-wrap flex-col items-center sm:flex-row border-b pb-3 justify-center sm:justify-between`}
  }
  .name {
    ${tw`lg:text-lg xl:text-xl font-bold tracking-wider`}
  }
  .childrenContainer {
    ${tw`mt-8 font-medium text-gray-700 lg:text-sm xl:text-base`}
  }
`;

const CustomSkeleton = tw(Skeleton)`mt-5 min-w-full`;

/* End styled components */

function CardItem({ title, onViewMoreClick, children, loading }) {
  return (
    <CardBlock featured>
      <CardHeader>
        <span className="headerContainer">
          <span className="name">{title}</span>

          {onViewMoreClick && (
            <ViewMoreBtn onClick={onViewMoreClick}>View more</ViewMoreBtn>
          )}
        </span>
        {loading ? (
          <CustomSkeleton count={5} height={50} width={100} />
        ) : (
          children && <div className="childrenContainer">{children}</div>
        )}
      </CardHeader>
    </CardBlock>
  );
}

function CardList({ children, loading }) {
  // Pass the loading props to all CardList.Item children
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === CardItem) {
      return React.cloneElement(child, { loading: loading });
    }
    return child;
  });

  return <CardsContainer>{childrenWithProps}</CardsContainer>;
}

CardList.Item = CardItem;

/* Start props validation */
CardItem.defaultProps = {
  title: "",
  onViewMoreClick: null,
  children: null,
  loading: false,
};

CardItem.propTypes = {
  title: PropTypes.string,
  onViewMoreClick: PropTypes.element,
  children: PropTypes.node,
  loading: PropTypes.bool,
};

CardList.defaultProps = {
  children: null,
  loading: false,
};

CardList.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
};

export default CardList;
