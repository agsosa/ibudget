/* 
  Simple hero component
*/

import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Link } from "react-router-dom";
import DesignIllustration from "third-party/treact/images/design-illustration.svg";
import { APP_NAME } from "lib/Config";

/* Start styled components */

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col lg:flex-row md:items-center max-w-screen-xl mx-auto py-10 md:py-24 px-5`;
const LeftColumn = tw.div`relative lg:w-6/12 lg:pr-12 flex-shrink-0 text-center lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex flex-col justify-center`;

const Heading = tw.h1`font-black text-3xl md:text-5xl leading-snug max-w-3xl`;
const Paragraph = tw.p`my-5 lg:my-8 text-sm lg:text-base font-medium text-gray-600 max-w-lg mx-auto lg:mx-0`;

const Actions = tw.div`flex flex-col items-center sm:flex-row justify-center lg:justify-start mt-8`;

const PrimaryButton = tw(Link)`font-bold px-8 lg:px-10 py-3 rounded 
bg-primary-500 text-gray-100 hocus:bg-primary-600 
focus:shadow-outline hocus:text-gray-100 focus:outline-none
transform hover:scale-105
transition duration-300`;

const IllustrationContainer = tw.div`flex justify-center md:justify-end items-center relative max-w-3xl lg:max-w-none`;

/* End styled components */

export default () => {
  const properties = {
    heading: "Take control of your financial future",
    description:
      "It's time to reclaim control and face your finances. Monitor your income, track your spending and save money. Try it today, it's free!",
    primaryButtonText: "Get Started",
    primaryButtonUrl: "/register",
    imageSrc: DesignIllustration,
    imageCss: null,
  };

  return (
    <>
      <Container>
        <TwoColumn>
          <LeftColumn>
            <Heading>{properties.heading}</Heading>
            <Paragraph>{properties.description}</Paragraph>
            <Actions>
              <PrimaryButton to={properties.primaryButtonUrl}>
                {properties.primaryButtonText}
              </PrimaryButton>
            </Actions>
          </LeftColumn>
          <RightColumn>
            <IllustrationContainer>
              <img
                css={properties.imageCss}
                src={properties.imageSrc}
                alt={APP_NAME}
              />
            </IllustrationContainer>
          </RightColumn>
        </TwoColumn>
      </Container>
    </>
  );
};
