import Articles from "components/dashboard/Articles";
import Card from "components/dashboard/Card";
import tw from "twin.macro";
import { ContentWithPaddingXl as ContentBase } from "treact/components/misc/Layouts";
import { SectionHeading } from "treact/components/misc/Headings";
import { SectionDescription } from "treact/components/misc/Typography";

const HeaderContainer = tw.div`w-full flex flex-col items-center`;
const Heading = tw(SectionHeading)`w-full text-primary-500`;
const Description = tw(SectionDescription)`w-full text-gray-700 text-center`;

const ContentWithPaddingXl = tw(
  ContentBase
)`relative z-10 mx-auto px-0 py-10 sm:px-6 md:px-8 lg:px-12 xl:px-24 sm:py-20 flex flex-col max-w-screen-xl`;

const CardsContainer = tw.div`mt-16 flex flex-col items-center lg:flex-row lg:items-stretch lg:justify-between text-gray-900 font-medium`;

function DashboardPage() {
  return (
    <ContentWithPaddingXl>
      <HeaderContainer>
        <Heading>Hello, Alejandro</Heading>
        <Description>It's been 5 days since your last log in</Description>
      </HeaderContainer>
      <CardsContainer>
        <Card />
        <Card />
      </CardsContainer>
      <Articles />
    </ContentWithPaddingXl>
  );
}

export default DashboardPage;
