import * as React from "react";
import Articles from "components/dashboard/Articles";
import CardList from "components/misc/CardList";
import tw from "twin.macro";
import { ContentWithPaddingXl as ContentBase } from "third-party/treact/components/misc/Layouts";
import { SectionHeading } from "third-party/treact/components/misc/Headings";
import DateRangeSelector from "components/misc/input/DateRangeSelector";
import { motion } from "framer-motion";
import LatestTransactionCard from "components/dashboard/cards-content/LatestTransactionsCard";
import SpendingCard from "components/dashboard/cards-content/SpendingCard";
import MoneyTrendCard from "components/dashboard/cards-content/MoneyTrendCard";
import MoneyFlowCard from "components/dashboard/cards-content/MoneyFlowCard";

/* Start styled components */

const HeaderContainer = tw.div`w-full flex flex-col items-center`;
const Heading = tw(SectionHeading)`w-full text-primary-500 text-5xl`;
const DateRangeContainer = tw.div`mt-8 flex-col text-center flex sm:flex-row justify-center align-middle`;
const DateRangeLabel = tw.text`text-gray-600 mr-3 mt-2`;
const Money = tw(motion.div)`  text-gray-700 text-center text-3xl font-bold`;
const Description = tw.text`w-full text-gray-600 text-center text-sm mt-3`;
const ContentWithPaddingXl = tw(ContentBase)`
mx-auto 
px-0 py-10 sm:px-6 
md:px-8 lg:px-12 xl:px-24 
sm:py-10 flex flex-col max-w-full`;

/* End style components */

function DashboardPage() {
  function Header() {
    return (
      <HeaderContainer>
        <Heading>Hello, Alejandro</Heading>
        <Description>Tu saldo hoy</Description>
        <Money
          animate={{
            scale: [1.15, 1.05, 1.22],
          }}
          transition={{
            type: "spring",
            ease: "easeInOut",
            stiffness: 100,
            duration: 2,
          }}
        >
          $580.000.000
        </Money>
        <DateRangeContainer>
          <DateRangeLabel>Period: </DateRangeLabel>
          <DateRangeSelector />
        </DateRangeContainer>
      </HeaderContainer>
    );
  }

  return (
    <ContentWithPaddingXl>
      <Header />

      <CardList>
        <LatestTransactionCard />

        <MoneyTrendCard />

        <SpendingCard />

        <MoneyFlowCard />
      </CardList>

      <Articles />
    </ContentWithPaddingXl>
  );
}

export default DashboardPage;
