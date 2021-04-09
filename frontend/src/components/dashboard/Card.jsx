import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { PropTypes } from "prop-types";

const CardBlock = styled.div`
  ${tw`
  w-screen
  lg:w-full bg-white rounded-lg 
  flex flex-col justify-between 
  py-5 px-6
  sm:px-8 lg:px-6
  lg:py-8 xl:p-8
  mt-8 mx-3 first:mt-0 lg:mt-0 
  shadow-sm
  shadow-raised`}
`;

const CardHeader = styled.div`
  .headerContainer {
    ${tw`flex flex-wrap flex-row sm:flex-row justify-between border-b pb-3`}
  }
  .name {
    ${tw`lg:text-lg xl:text-xl font-bold tracking-wider mr-3`}
  }
  .childrenContainer {
    ${tw`mt-8 font-medium text-gray-700 lg:text-sm xl:text-base`}
  }
`;

function Card({ title, RightHeaderComponent, children }) {
  return (
    <CardBlock featured>
      <CardHeader>
        <span className="headerContainer">
          <span className="name">{title}</span>

          {RightHeaderComponent && (
            <span>
              <RightHeaderComponent />
            </span>
          )}
        </span>
        {children && <div className="childrenContainer">{children}</div>}
      </CardHeader>
    </CardBlock>
  );
}

Card.defaultProps = {
  title: "",
  RightHeaderComponent: null,
  children: null,
};

Card.propTypes = {
  title: PropTypes.string,
  RightHeaderComponent: PropTypes.element,
  children: PropTypes.node,
};

export default Card;
