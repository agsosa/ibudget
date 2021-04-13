/* 
  Simple components to display three steps
*/

import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "third-party/treact/components/misc/Headings";

/* Start styled components */

const Container = tw.div`relative w-full flex justify-center items-center mx-auto mt-10 px-10`;
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;

const Steps = tw.ul`mt-12 flex flex-col lg:flex-row justify-center self-center items-center`;
const Step = tw.li`mt-8 flex flex-col md:flex-row items-center`;
const StepNumber = tw.div`font-semibold text-4xl leading-none text-gray-400`;
const StepText = tw.div`mt-3 md:mt-0 md:ml-6`;
const StepHeading = tw.h6`leading-none text-xl font-semibold`;
const StepDescription = tw.p`mt-3 max-w-xs leading-loose text-sm text-gray-600 font-medium`;

/* End styled components */

const config = {
  subheading: "How it Works",
  heading: (
    <>
      Money management made <span tw="text-primary-500">easy.</span>
    </>
  ),
  textOnLeft: true,
  steps: null,
  decoratorBlobCss: null,
};

const defaultSteps = [
  {
    heading: "Register",
    description: "Create an account with us using Google, Facebook or Email.",
  },
  {
    heading: "Add transactions",
    description:
      "Start registering your income and expenses, synchronize it across all your devices.",
  },
  {
    heading: "Analyze",
    description:
      "Use our tools to analyze your spending, income and start saving money.",
  },
];

export default () => {
  return (
    <Container>
      <TextContent>
        <Subheading>{config.subheading}</Subheading>
        <Heading>{config.heading}</Heading>
        <Steps>
          {defaultSteps.map((step, index) => (
            <Step key={step.heading}>
              <StepNumber>{(index + 1).toString().padStart(2, "0")}</StepNumber>
              <StepText>
                <StepHeading>{step.heading}</StepHeading>
                <StepDescription>{step.description}</StepDescription>
              </StepText>
            </Step>
          ))}
        </Steps>
      </TextContent>
    </Container>
  );
};
