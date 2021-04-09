import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "treact/components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "treact/components/misc/Buttons";

/* Start styled components */

const Container = tw.div`w-full px-5 py-16 pb-32 `;
const TextContent = tw.div`w-full lg:py-8 text-center items-center content-center`;

const Subheading = tw(SubheadingBase)`text-center`;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-3xl sm:text-4xl lg:text-5xl leading-tight`;
const Description = tw.p`mt-4 text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const Form = tw.form`text-sm flex flex-col max-w-2xl mt-8 sm:mt-20 mx-auto`; // mt-8 md:mt-10 max-w-sm mx-auto md:mx-0
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`;
const Textarea = styled(Input).attrs({ as: "textarea" })`
  ${tw`h-24`}
`;

const SubmitButton = tw(PrimaryButtonBase)`self-center mt-8`;

/* End styled components */

export default () => {
  return (
    <Container>
      <TextContent>
        <Subheading>Contact Us</Subheading>
        <Heading>
          Feel free to <span tw="text-primary-500">get in touch</span>
          <wbr /> with us.
        </Heading>
        <Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Description>
        <Form action="#" method="get">
          <Input type="email" name="email" placeholder="Your Email Address" />
          <Input type="text" name="name" placeholder="Full Name" />
          <Input type="text" name="subject" placeholder="Subject" />
          <Textarea name="message" placeholder="Your Message Here" />
          <SubmitButton type="submit">Send</SubmitButton>
        </Form>
      </TextContent>
    </Container>
  );
};
