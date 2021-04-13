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
import RadioGroup from "components/misc/input/RadioGroup";
import { CategoryEnum } from "ibudget-shared";
import CheckboxGroup from "react-checkbox-group";
import { getCategoryLabel } from "lib/Helpers";
import CategoryIcon from "components/dashboard/CategoryIcon";
import Accordion from "components/misc/Accordion";
import TransactionList from "components/dashboard/TransactionList";

/* Start styled components */

const HeaderContainer = tw.div`w-full flex flex-col items-center`;
const DateRangeContainer = tw.div`-mt-2 mb-8 flex-col text-center flex sm:flex-row justify-center align-middle`;
const DateRangeLabel = tw.text`text-gray-600 mr-3 mt-2`;
const Container = tw.div`
self-center gap-3 flex flex-col w-screen mx-5
md:grid md:grid-cols-9 md:gap-6 
md:max-w-screen-xl md:w-full`;
const LeftColumn = tw.div`
col-span-3 flex flex-col 
shadow-sm rounded-xl 
p-8 px-12 md:p-4 lg:p-8 
bg-white`;
const RightColumn = tw.div`col-span-6 shadow-sm rounded-xl p-10 bg-white`;
const Title = tw.text`text-xl p-3 sm:p-0 md:text-2xl font-semibold`;
const CategoryCheckboxContainer = tw.div`flex flex-row align-middle items-center gap-1`;
const CategoryCheckboxLabel = tw.text`text-base`;

/* End style components */

const ALL_CATEGORIES = -1;
// categoryFilterOptions: Array of all the CategoryEnum values + ALL_CATEGORIES to display the category filter checkbox list
const categoryFilterOptions = [ALL_CATEGORIES, ...Object.values(CategoryEnum)];

function TransactionsPage({ loading }) {
  const selection = store.select((models) => ({
    transactions: models.BudgetModel.transactionsFromSelectedPeriod,
  }));
  const { transactions } = useSelector(selection);

  const [localTransactions, setLocalTransactions] = React.useState(true); // Used to filter, sort, etc. locally
  const [categoryFilterArray, setFilterCategoryArray] = React.useState([
    ALL_CATEGORIES,
  ]);

  React.useEffect(() => {
    // Filter and Sort on transactions state or filter update
    let filteredAndSorted = transactions;

    if (!categoryFilterArray.includes(ALL_CATEGORIES))
      filteredAndSorted = filteredAndSorted.filter((q) =>
        categoryFilterArray.includes(q.category_id)
      );

    setLocalTransactions(filteredAndSorted);
  }, [transactions, categoryFilterArray]);

  // Triggered on Category checkbox click. Param v: array of categoryFilterOptions
  function handleFilterCategoryChange(valuesArray) {
    if (valuesArray.length > 0) {
      if (
        valuesArray.includes(ALL_CATEGORIES) &&
        !categoryFilterArray.includes(ALL_CATEGORIES)
      ) {
        // Uncheck every category except ALL_CATEGORIES if the user checked the all categories option
        setFilterCategoryArray([ALL_CATEGORIES]);
      } else if (categoryFilterArray.includes(ALL_CATEGORIES)) {
        // Uncheck ALL_CATEGORIES if it's already checked and the user checked a category
        setFilterCategoryArray(valuesArray.filter((q) => q !== ALL_CATEGORIES));
      } else {
        // Remaining cases with ALL_CATEGORIES unchecked
        setFilterCategoryArray(valuesArray);
      }
    }
  }

  const CategoryCheckboxes = (
    <CheckboxGroup
      name="fruits"
      value={categoryFilterArray}
      onChange={handleFilterCategoryChange}
    >
      {(Checkbox) => (
        <>
          {categoryFilterOptions.map((v) => {
            return (
              <CategoryCheckboxContainer>
                <Checkbox value={v} />
                <CategoryIcon category={v} small />
                <CategoryCheckboxLabel>
                  {v === ALL_CATEGORIES
                    ? "Todas las categorías"
                    : getCategoryLabel(v)}
                </CategoryCheckboxLabel>
              </CategoryCheckboxContainer>
            );
          })}
        </>
      )}
    </CheckboxGroup>
  );

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
          <LeftColumn>
            <Title>Transacciones</Title>
            <Accordion
              isMulti
              items={[
                { title: "Categorías", contentComponent: CategoryCheckboxes },
                { title: "test 2", contentComponent: null },
              ]}
            />
          </LeftColumn>
          <RightColumn>
            <TransactionList limit={10} data={localTransactions} />
          </RightColumn>
        </Container>
      </ContentWithPadding>
    );
  }

  return <NoDataIndicator />; // If we got an empty transactions array from the store
}

export default withFetchTransactions(TransactionsPage);
