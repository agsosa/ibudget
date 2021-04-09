import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Link } from "react-router-dom";

import { ReactComponent as SvgDecoratorBlob1 } from "treact/images/svg-decorator-blob-1.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "treact/images/dot-pattern.svg";
import DesignIllustration from "treact/images/design-illustration.svg";

/* Start styled components */

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col lg:flex-row md:items-center max-w-screen-xl mx-auto py-20 md:py-24`;
const LeftColumn = tw.div`relative lg:w-6/12 lg:pr-12 flex-shrink-0 text-center lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex flex-col justify-center`;

const Heading = tw.h1`font-black text-3xl md:text-5xl leading-snug max-w-3xl`;
const Paragraph = tw.p`my-5 lg:my-8 text-sm lg:text-base font-medium text-gray-600 max-w-lg mx-auto lg:mx-0`;

const Actions = tw.div`flex flex-col items-center sm:flex-row justify-center lg:justify-start mt-8`;

const PrimaryButton = tw(
  Link
)`font-bold px-8 lg:px-10 py-3 rounded bg-primary-500 text-gray-100 hocus:bg-primary-600 focus:shadow-outline hocus:text-gray-100 focus:outline-none transition duration-300`;

const IllustrationContainer = tw.div`flex justify-center md:justify-end items-center relative max-w-3xl lg:max-w-none`;

// Random Decorator Blobs (shapes that you see in background)
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3  -z-10`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none fill-current text-primary-500 opacity-25 absolute w-32 h-32 right-0 bottom-0 transform translate-x-10 translate-y-10 -z-10`}
`;

/* End styled components */

const properties = {
  heading: "Take control of your financial future",
  description:
    "It's time to reclaim control and face your finances. Monitor your income, track your spending and save money. Try it today, it's free!",
  primaryButtonText: "Get Started",
  primaryButtonUrl: "/register",
  watchVideoButtonText: "Watch Video",
  watchVideoYoutubeUrl: "https://www.youtube.com/embed/_GuOjXYl5ew",
  imageSrc: DesignIllustration,
  imageCss: null,
  imageDecoratorBlob: false,
};

export default () => {
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
                alt="Hero"
              />
              {properties.imageDecoratorBlob && <DecoratorBlob2 />}
            </IllustrationContainer>
          </RightColumn>
        </TwoColumn>
        <DecoratorBlob1 />
      </Container>
    </>
  );
};
