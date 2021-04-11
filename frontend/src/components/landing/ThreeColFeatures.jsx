/*
  Component to display features (three columns)
  TODO: Document cards object
*/

import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line

import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "third-party/treact/components/misc/Headings";
import { SectionDescription } from "third-party/treact/components/misc/Typography";

import SupportIconImage from "third-party/treact/images/support-icon.svg";
import ShieldIconImage from "third-party/treact/images/shield-icon.svg";
import CustomizeIconImage from "third-party/treact/images/customize-icon.svg";
import FastIconImage from "third-party/treact/images/fast-icon.svg";
import ReliableIconImage from "third-party/treact/images/reliable-icon.svg";
import SimpleIconImage from "third-party/treact/images/simple-icon.svg";

/* Start styled components */

const Container = tw.div`relative`;

const ThreeColumnContainer = styled.div`
  ${tw`flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-lg mx-auto py-10 md:py-24 px-5`}
`;
const Subheading = tw(SubheadingBase)`mb-4`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center`;

const VerticalSpacer = tw.div`mt-10 w-full`;

const Column = styled.div`
  ${tw`md:w-1/2 lg:w-1/3 max-w-sm`}
`;

const Card = styled.div`
  ${tw`flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left h-full mx-4 px-2 py-8`}
  .imageContainer {
    ${tw`border text-center rounded-full p-5 flex-shrink-0`}
    img {
      ${tw`w-6 h-6`}
    }
  }

  .textContainer {
    ${tw`sm:ml-4 mt-4 sm:mt-2`}
  }

  .title {
    ${tw`mt-4 tracking-wide font-bold text-2xl leading-none`}
  }

  .description {
    ${tw`mt-1 sm:mt-4 font-medium text-secondary-100 leading-loose`}
  }
`;

/* End styled components */

/*
 *  cards is an array of objects:
 *  1) imageSrc - the image shown at the top of the card
 *  2) title - the title of the card
 *  3) description - the description of the card
 *  If a key for a particular card is not provided, a default value is used
 */

const exampleDesc = `This is just an example.`;

const cards = [
  {
    imageSrc: ShieldIconImage,
    title: "Secure",
    description:
      "We strictly only deal with vendors that provide top notch security.",
  },
  {
    imageSrc: SupportIconImage,
    title: "24/7 Support",
    description: exampleDesc,
  },
  {
    imageSrc: CustomizeIconImage,
    title: "Customizable",
    description: exampleDesc,
  },
  { imageSrc: ReliableIconImage, title: "Reliable", description: exampleDesc },
  { imageSrc: FastIconImage, title: "Fast", description: exampleDesc },
  { imageSrc: SimpleIconImage, title: "Easy", description: exampleDesc },
];

export default () => {
  return (
    <Container>
      <ThreeColumnContainer>
        <Subheading>Features</Subheading>

        <Heading>Amazing Features</Heading>

        <Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Description>

        <VerticalSpacer />

        {cards.map((card) => (
          <Column key={card.title}>
            <Card>
              <span className="imageContainer">
                <img src={card.imageSrc || ShieldIconImage} alt="" />
              </span>
              <span className="textContainer">
                <span className="title">{card.title}</span>
                <p className="description">{card.description}</p>
              </span>
            </Card>
          </Column>
        ))}
      </ThreeColumnContainer>
    </Container>
  );
};
