/* eslint-disable */

import * as React from "react";
import Articles from "components/dashboard/Articles";
import CardList from "components/misc/CardList";
import tw from "twin.macro";
import { ContentWithPaddingXl as ContentBase } from "third-party/treact/components/misc/Layouts";
import { SectionHeading } from "third-party/treact/components/misc/Headings";
import DateRangeSelector from "components/dashboard/smart-components/DateRangeSelector";
import { motion } from "framer-motion";
import LatestTransactions from "components/dashboard/smart-components/LatestTransactions";
import Spending from "components/dashboard/smart-components/Spending";
import MoneyTrend from "components/dashboard/smart-components/MoneyTrend";
import MoneyFlow from "components/dashboard/smart-components/MoneyFlow";
import { getMoneyDisplayString } from "lib/Helpers";
import { useSelector, useDispatch } from "react-redux";
import store from "lib/Store";
import logo from "images/logo.png";
import Icon from "@mdi/react";
import CloudLoadingIndicator from "./../../components/misc/CloudLoadingIndicator";
import { subDays } from "date-fns";

/* Start styled components */

const HeaderContainer = tw.div`w-full flex flex-col items-center`;
const Heading = tw(
  SectionHeading
)`w-full text-primary-500 text-5xl transform hover:scale-110 transition-all duration-500`;
const DateRangeContainer = tw.div`mt-8 flex-col text-center flex sm:flex-row justify-center align-middle`;
const DateRangeLabel = tw.text`text-gray-600 mr-3 mt-2`;
const Money = tw(motion.div)`  text-gray-700 text-center text-3xl font-bold `;
const Description = tw.text`w-full text-gray-600 text-center text-sm mt-3`;
const ContentWithPaddingXl = tw(ContentBase)`
mx-auto 
px-0 py-10 sm:px-6 
md:px-8 lg:px-12 xl:px-24 
sm:py-10 flex flex-col max-w-full`;

/* End style components */

function DashboardPage() {
  /* Start Handle store */
  const [loading, setLoading] = React.useState(true); // TODO: Remove and use rematch plugin
  const dispatch = useDispatch();

  const selection = store.select((models) => ({
    balance: models.BudgetModel.currentBalance,
  }));
  const { balance } = useSelector(selection);

  React.useEffect(() => {
    dispatch({ type: "BudgetModel/fetchTransactions" });

    setTimeout(() => setLoading(false), 1); // TODO: Remove
  }, []);

  /* End handle store */

  // Last Transactions View More click handler
  function handleLastTransactionsViewMore() {
    console.log("handleLastTransactionsViewMore");
  }

  // Header section
  function Header() {
    return (
      <HeaderContainer>
        {loading ? (
          <CloudLoadingIndicator download />
        ) : (
          <>
            <Heading>Hello, Alejandro</Heading>
            <Description>Tu saldo hoy</Description>
            <Money
              animate={{
                scale: [1, 0.95, 1.25],
              }}
              transition={{
                type: "spring",
                ease: "easeInOut",
                stiffness: 100,
                duration: 1.8,
              }}
            >
              {getMoneyDisplayString(balance)}
            </Money>
            <DateRangeContainer>
              <DateRangeLabel>Period: </DateRangeLabel>
              <DateRangeSelector />
            </DateRangeContainer>
          </>
        )}
      </HeaderContainer>
    );
  }

  return (
    <ContentWithPaddingXl>
      <Header />

      <CardList loading={loading}>
        <CardList.Item
          title="Últimas transacciones"
          onViewMoreClick={handleLastTransactionsViewMore}
        >
          <LatestTransactions limit={5} />
        </CardList.Item>

        <CardList.Item title="Tendencia del saldo">
          <MoneyTrend />
        </CardList.Item>

        <CardList.Item title="Gastos">
          <Spending />
        </CardList.Item>

        <CardList.Item title="Flujo del dinero">
          <MoneyFlow />
        </CardList.Item>
      </CardList>

      <Articles />
    </ContentWithPaddingXl>
  );
}

export default DashboardPage;
