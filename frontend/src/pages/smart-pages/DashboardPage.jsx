/*
  Smart component (Interacting with BudgetModel)

  Main dashboard page
*/
import * as React from "react";
// import Articles from "components/dashboard/Articles";
import CardList from "components/misc/CardList";
import tw from "twin.macro";
import { SectionHeading } from "third-party/treact/components/misc/Headings";
import DateRangeSelector from "components/smart-components/DateRangeSelector";
import { motion } from "framer-motion";
import LatestTransactions from "components/smart-components/LatestTransactions";
import Spending from "components/smart-components/Spending";
import MoneyTrend from "components/smart-components/MoneyTrend";
import MoneyFlow from "components/smart-components/MoneyFlow";
import { getMoneyDisplayString } from "lib/Helpers";
import { useSelector } from "react-redux";
import store from "lib/Store";
import CloudLoadingIndicator from "components/misc/CloudLoadingIndicator";
import ContentWithPadding from "components/layout/ContentWithPadding";
import { useHistory } from "react-router-dom";
import withFetchTransactions from "components/smart-components/withFetchTransactions";
import { PropTypes } from "prop-types";
import { useAuth } from "lib/Auth";

/* Start styled components */

const HeaderContainer = tw.div`w-full flex flex-col items-center`;
const Heading = tw(
  SectionHeading
)`text-primary-500 font-black text-4xl transform hover:scale-110 transition-all duration-500`;
const DateRangeContainer = tw.div`mt-8 flex-col text-center flex sm:flex-row justify-center align-middle`;
const DateRangeLabel = tw.text`text-gray-600 mr-3 mt-2`;
const Money = tw(motion.div)`  text-gray-700 text-center text-3xl font-bold `;
const Description = tw.text`w-full text-gray-600 text-center text-sm mt-3`;

/* End style components */

function DashboardPage({ loading }) {
  /* Start store */

  const selection = store.select((models) => ({
    balance: models.BudgetModel.currentBalance,
  }));
  const { balance } = useSelector(selection);

  /* End store */

  const auth = useAuth();
  const history = useHistory();

  // Last Transactions View More click handler
  function handleLastTransactionsViewMoreButton() {
    history.push("/transactions");
  }

  // Header section
  function Header() {
    return (
      <HeaderContainer>
        {loading ? (
          <CloudLoadingIndicator download />
        ) : (
          <>
            <Heading>
              {auth.getIsLoggedIn() && auth.user.name
                ? `Hello, ${auth.user.name}`
                : "Welcome"}
            </Heading>
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
    <ContentWithPadding>
      <Header />

      <CardList loading={loading}>
        <CardList.Item
          title="Últimas transacciones"
          onViewMoreClick={handleLastTransactionsViewMoreButton}
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

      {/* <Articles /> */}
    </ContentWithPadding>
  );
}

DashboardPage.propTypes = {
  loading: PropTypes.bool.isRequired, // Injected by withFetchTransactions
};

export default withFetchTransactions(DashboardPage);
