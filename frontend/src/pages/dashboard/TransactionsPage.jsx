/* eslint-disable */
import * as React from "react";
// import Articles from "components/dashboard/Articles";
import CardList from "components/misc/CardList";
import tw from "twin.macro";
import DateRangeSelector from "components/dashboard/smart-components/DateRangeSelector";
import LatestTransactions from "components/dashboard/smart-components/LatestTransactions";
import { useSelector } from "react-redux";
import store from "lib/Store";
import CloudLoadingIndicator from "components/misc/CloudLoadingIndicator";
import ContentWithPadding from "components/layout/ContentWithPadding";
import withFetchTransactions from "components/dashboard/smart-components/withFetchTransactions";
import NoDataIndicator from "components/misc/NoDataIndicator";

/* Start styled components */

const HeaderContainer = tw.div`w-full flex flex-col items-center`;
const DateRangeContainer = tw.div`mt-2 mb-5 flex-col text-center flex sm:flex-row justify-center align-middle`;
const DateRangeLabel = tw.text`text-gray-600 mr-3 mt-2`;

const Container = tw.div`bg-black flex flex-row w-full justify-center`;
const LeftColumn = tw.div`bg-red-500 w-48`;
const RightColumn = tw.div`bg-blue-500 w-4/6`;

/* End style components */

function TransactionsPage({ loading }) {
  // Get transactions with selected period from store
  const selection = store.select((models) => ({
    transactions: models.BudgetModel.transactionsFromSelectedPeriod,
  }));

  const { transactions } = useSelector(selection);

  const [localTransactions, setLocalTransactions] = React.useState(true); // Used to filter, sort, etc. locally

  React.useEffect(() => {}, transactions);

  if (transactions && transactions.length >= 1) {
    return (
      <ContentWithPadding>
        <HeaderContainer>
          {loading ? (
            <CloudLoadingIndicator download />
          ) : (
            <>
              <DateRangeContainer>
                <DateRangeLabel>Period: </DateRangeLabel>
                <DateRangeSelector />
              </DateRangeContainer>
            </>
          )}
        </HeaderContainer>
        <Container>
          <LeftColumn>asd</LeftColumn>
          <RightColumn>
            <LatestTransactions limit={10} />
          </RightColumn>
        </Container>
      </ContentWithPadding>
    );
  }

  return <NoDataIndicator />; // If we got an empty transactions array from the store
}

export default withFetchTransactions(TransactionsPage);
