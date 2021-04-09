/* 
  Cards components (list or individual)

  Usage:
    - For a single card use
        <CardList.Item>
          (content)
        </CardList.Item>

      CardList.Item Props:
        - title: string to display as title
        - onViewMoreClick: callback to enable a View More button

    - For a list of cards wrap every CardList.Item with <CardList></CardList>
*/

import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { PropTypes } from "prop-types";

/* Start styled components */

const CardsContainer = tw.div`
w-full
mt-10 items-center
text-gray-900 font-medium 
lg:items-stretch lg:justify-between 
lg:grid lg:gap-4 lg:grid-cols-2 `;

const ViewMoreBtn = tw.button`
mt-2 sm:mt-0
text-primary-700 bg-primary-100 
rounded-lg px-2 font-semibold
 hocus:bg-primary-200 hocus:text-primary-900 
 focus:shadow-outline
 transition duration-500 ease-in-out`;

const CardBlock = styled.div`
  ${tw`
  w-full
  bg-white rounded-lg 
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
    ${tw`flex flex-wrap flex-row sm:flex-row border-b pb-3 justify-center sm:justify-between`}
  }
  .name {
    ${tw`lg:text-lg xl:text-xl font-bold tracking-wider mr-3`}
  }
  .childrenContainer {
    ${tw`mt-8 font-medium text-gray-700 lg:text-sm xl:text-base`}
  }
`;

/* End styled components */

function CardItem({ title, onViewMoreClick, children }) {
  return (
    <CardBlock featured>
      <CardHeader>
        <span className="headerContainer">
          <span className="name">{title}</span>

          {onViewMoreClick && (
            <ViewMoreBtn onClick={onViewMoreClick}>View more</ViewMoreBtn>
          )}
        </span>
        {children && <div className="childrenContainer">{children}</div>}
      </CardHeader>
    </CardBlock>
  );
}

function CardList({ children }) {
  return <CardsContainer>{children}</CardsContainer>;
}

CardList.Item = CardItem;

/* Start props validation */
CardItem.defaultProps = {
  title: "",
  onViewMoreClick: null,
  children: null,
};

CardItem.propTypes = {
  title: PropTypes.string,
  onViewMoreClick: PropTypes.element,
  children: PropTypes.node,
};

CardList.defaultProps = {
  children: null,
};

CardList.propTypes = {
  children: PropTypes.node,
};

export default CardList;
