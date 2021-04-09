import Articles from "components/dashboard/Articles";
import CardList from "components/dashboard/CardList";
import tw, { styled } from "twin.macro";
import { ContentWithPaddingXl as ContentBase } from "treact/components/misc/Layouts";
import { SectionHeading } from "treact/components/misc/Headings";
import Chart from "components/dashboard/charts/AreaChart";
import PieChart from "components/dashboard/charts/PieChart";
import Gauge from "components/dashboard/charts/Gauge";
import DateTimePicker from "components/dashboard/date-time-picker";
import TransactionList from "components/dashboard/TransactionList";
import { EnumCategory } from "lib/Enums";

/* Start styled components */

const HeaderContainer = tw.div`w-full flex flex-col items-center`;
const Heading = tw(SectionHeading)`w-full text-primary-500 text-5xl`;
const Money = tw.text`w-full text-gray-700 text-center text-3xl font-bold`;
const MoneySmall = styled.text(({ isNegative }) => [
  tw`w-full text-center text-xl font-bold`,
  isNegative ? tw`text-red-600` : tw`text-green-600`,
]);
const Description = tw.text`w-full text-gray-600 text-center text-sm mt-3`;
const Container = tw.div`w-full flex flex-col items-center -mt-2`;
const FlujoContainer = tw(Container)`lg:flex-row -mb-5 sm:mb-0 mt-2 `;

const ContentWithPaddingXl = tw(ContentBase)`
relative mx-auto 
px-0 py-10 sm:px-6 
md:px-8 lg:px-12 xl:px-24 
sm:py-10 flex flex-col max-w-full`;

/* End style components */

function DashboardPage() {
  function handleLastTransactionsViewMore() {
    console.log("handleLastTransactionsViewMore");
  }

  function handleSpendingViewMore() {
    console.log("handleSpendingViewMore");
  }

  function handleMoneyFlowViewMore() {
    console.log("handleMoneyFlowViewMore");
  }

  return (
    <ContentWithPaddingXl>
      <HeaderContainer>
        <Heading>Hello, Alejandro</Heading>
        <Description>Tu saldo hoy</Description>
        <Money>$580.000.000</Money>
        <DateTimePicker />
      </HeaderContainer>
      <CardList>
        <CardList.Item
          title="Últimas operaciones"
          onViewMoreClick={handleLastTransactionsViewMore}
        >
          <TransactionList>
            {Object.values(EnumCategory)
              .slice(0, 5)
              .map((v) => {
                return <TransactionList.Item category={v} />;
              })}
          </TransactionList>
        </CardList.Item>
        <CardList.Item title="Tendencia del saldo">
          <Chart />
        </CardList.Item>
        <CardList.Item title="Gastos" onViewMoreClick={handleSpendingViewMore}>
          <Container>
            <Description>Últimos 31 dias</Description>
            <MoneySmall isNegative>-$366.55,10</MoneySmall>
            <PieChart />
          </Container>
        </CardList.Item>
        <CardList.Item
          title="Flujo del dinero"
          onViewMoreClick={handleMoneyFlowViewMore}
        >
          <Container>
            <FlujoContainer>
              <Container>
                <Description>Últimos 31 dias</Description>
                <MoneySmall>+$366.55,10</MoneySmall>
              </Container>
              <Container>
                <Description>Ingresos</Description>
                <MoneySmall>+$366.55,10</MoneySmall>
              </Container>
              <Container>
                <Description>Egresos</Description>
                <MoneySmall isNegative>-$366.55,10</MoneySmall>
              </Container>
            </FlujoContainer>
            <Gauge />
          </Container>
        </CardList.Item>
      </CardList>

      <Articles />
    </ContentWithPaddingXl>
  );
}

export default DashboardPage;
