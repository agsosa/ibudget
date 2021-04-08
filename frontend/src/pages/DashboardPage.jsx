import Articles from "components/dashboard/Articles";
import Card from "components/dashboard/Card";
import tw from "twin.macro";
import { ContentWithPaddingXl as ContentBase } from "treact/components/misc/Layouts";
import { SectionHeading } from "treact/components/misc/Headings";
import { SectionDescription } from "treact/components/misc/Typography";
import Chart from "components/dashboard/AreaChart";
import PieChart from "components/dashboard/PieChart";

const HeaderContainer = tw.div`w-full flex flex-col items-center`;
const Heading = tw(SectionHeading)`w-full text-primary-500`;
const Description = tw(SectionDescription)`w-full text-gray-700 text-center`;

const ContentWithPaddingXl = tw(
  ContentBase
)`relative mx-auto px-0 py-10 sm:px-6 md:px-8 lg:px-12 xl:px-24 sm:py-10 flex flex-col max-w-full`;

const CardsContainer = tw.div`mt-10 lg:grid gap-4 grid-cols-2 items-center lg:items-stretch lg:justify-between text-gray-900 font-medium`;

const TestComponent = () => <button type="submit">asd</button>;

function DashboardPage() {
  return (
    <ContentWithPaddingXl>
      <HeaderContainer>
        <Heading>Hello, Alejandro</Heading>
        <Description>It's been 5 days since your last log in</Description>
      </HeaderContainer>
      <CardsContainer>
        <Card
          title="Últimas 10 operaciones"
          RightHeaderComponent={TestComponent}
        >
          hola hola testeando contenido xddddd
          <button type="submit">test button</button>
        </Card>
        <Card title="Tendencia">
          <Chart />
        </Card>
        <Card title="Gastos" RightHeaderComponent={TestComponent}>
          <PieChart />
        </Card>
        <Card title="Flujo" RightHeaderComponent={TestComponent}>
          hola
        </Card>
      </CardsContainer>

      <Articles />
    </ContentWithPaddingXl>
  );
}

export default DashboardPage;
