import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { PropTypes } from "prop-types";

const CardBlock = styled.div`
  ${tw`w-full max-w-sm bg-white rounded-lg shadow-sm py-10 px-6 sm:px-10 lg:px-6 lg:py-10 xl:p-8 mx-3 flex flex-col justify-between mt-16 first:mt-0 lg:mt-0 shadow-raised`}
`;

const CardHeader = styled.div`
  .headerContainer {
    ${tw`flex flex-wrap flex-col sm:flex-row justify-between items-center border-b pb-3`}
  }
  .name {
    ${tw`lg:text-lg xl:text-xl font-bold uppercase tracking-wider mr-3`}
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
