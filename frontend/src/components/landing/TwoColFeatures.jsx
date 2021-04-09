import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { css } from "styled-components/macro"; //eslint-disable-line

import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "treact/components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "treact/components/misc/Buttons";
import StatsIllustrationSrc from "treact/images/stats-illustration.svg";

/* Start styled components */

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-10 md:py-24 px-5`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto relative`;
const TextColumn = styled(Column)((props) => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft
    ? tw`md:mr-12 lg:mr-16 md:order-first`
    : tw`md:ml-12 lg:ml-16 md:order-last`,
]);

const Image = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const Statistics = tw.div`flex flex-col items-center sm:block text-center md:text-left mt-4`;
const Statistic = tw.div`text-left sm:inline-block sm:mr-12 last:mr-0 mt-4`;
const Value = tw.div`font-bold text-lg sm:text-xl lg:text-2xl text-secondary-500 tracking-wide`;
const Key = tw.div`font-medium text-primary-700`;

const PrimaryButton = tw(
  PrimaryButtonBase,
  Link
)`mt-8 md:mt-10 text-sm inline-block mx-auto md:mx-0`;

/* End styled components */

const properties = {
  subheading: "How it works",
  heading: (
    <>
      Effective financial management in <wbr />
      <span tw="text-primary-500">one place</span>
    </>
  ),
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  primaryButtonText: "Learn More",
  primaryButtonUrl: "/how-it-works",
  imageSrc: StatsIllustrationSrc,
  imageCss: null,
  imageContainerCss: null,
  imageDecoratorBlob: false,
  imageDecoratorBlobCss: null,
  imageInsideDiv: true,
  statistics: [
    {
      key: "Clients",
      value: "2282+",
    },
    {
      key: "Projects",
      value: "3891+",
    },
    {
      key: "Awards",
      value: "1000+",
    },
  ],
  textOnLeft: false,
};

export default () => {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.

  return (
    <Container>
      <TwoColumn css={!properties.imageInsideDiv && tw`md:items-center`}>
        <ImageColumn css={properties.imageContainerCss}>
          {properties.imageInsideDiv ? (
            <Image imageSrc={properties.imageSrc} css={properties.imageCss} />
          ) : (
            <img src={properties.imageSrc} css={properties.imageCss} alt="" />
          )}
        </ImageColumn>
        <TextColumn textOnLeft={properties.textOnLeft}>
          <TextContent>
            {properties.subheading && (
              <Subheading>{properties.subheading}</Subheading>
            )}
            <Heading>{properties.heading}</Heading>
            <Description>{properties.description}</Description>
            <Statistics>
              {properties.statistics.map((statistic) => (
                <Statistic key={statistic.key}>
                  <Value>{statistic.value}</Value>
                  <Key>{statistic.key}</Key>
                </Statistic>
              ))}
            </Statistics>
            <PrimaryButton to={properties.primaryButtonUrl}>
              {properties.primaryButtonText}
            </PrimaryButton>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};
