/*
  Simple FAQ with dropdowns

  TODO: Replace faq placeholders
*/

import React from "react";
import tw from "twin.macro";
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "third-party/treact/components/misc/Headings";
import {
  Container,
  ContentWithPaddingXl,
} from "third-party/treact/components/misc/Layouts";
import { APP_NAME } from "lib/Config";
import Accordion from "components/misc/Accordion";

/* Start styled components */

const Subheading = tw(SubheadingBase)`mb-4 text-center`;
const Heading = tw(SectionHeading)`w-full`;

const Column = tw.div`flex flex-col items-center`;
const HeaderContent = tw.div`mb-10`;

/* End styled components */

const config = {
  subheading: "FAQ",
  heading: "Frequently Asked Questions",
  faqs: [
    {
      title: `Is ${APP_NAME} free to use?`,
      contentComponent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      title: "Lorem ipsum dolor sit amet",
      contentComponent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      title: "Lorem ipsum dolor sit amet",
      contentComponent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      title: "Lorem ipsum dolor sit amet",
      contentComponent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ],
};

export default () => {
  return (
    <Container>
      <ContentWithPaddingXl>
        <Column>
          <HeaderContent>
            {config.subheading && <Subheading>{config.subheading}</Subheading>}
            <Heading>{config.heading}</Heading>
          </HeaderContent>
          <Accordion items={config.faqs} />
        </Column>
      </ContentWithPaddingXl>
    </Container>
  );
};
