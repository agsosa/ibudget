/* 
  Smart component (interacting with BudgetModel)
  Transactions list page
*/
import * as React from "react";
import tw from "twin.macro";
import DateRangeSelector from "components/smart-components/DateRangeSelector";
import { useSelector } from "react-redux";
import store from "lib/Store";
import ContentWithPadding from "components/layout/ContentWithPadding";
import withFetchTransactions from "components/smart-components/withFetchTransactions";
import NoDataIndicator from "components/misc/NoDataIndicator";
import { CategoryEnum, TransactionTypeEnum } from "ibudget-shared";
import CheckboxGroup from "react-checkbox-group";
import {
  getCategoryLabel,
  getTransactionTypeLabel,
  bigNumberFormatter,
  getTransactionAmountWithSign,
  getSortModeLabel,
} from "lib/Helpers";
import CategoryIcon from "components/dashboard/CategoryIcon";
import Accordion from "components/misc/Accordion";
import TransactionList from "components/dashboard/TransactionList";
import Skeleton from "react-loading-skeleton";
import { SortModeEnum } from "lib/Enums";
import { PropTypes } from "prop-types";

/* Start styled components */

const HeaderContainer = tw.div`w-full flex flex-col items-center mb-8 `;
const DateRangeContainer = tw.div`flex-col text-center flex sm:flex-row justify-center align-middle`;
const DateRangeLabel = tw.text`text-gray-700 mr-3 mt-2`;
const Container = tw.div`
min-h-screen
self-center gap-3 flex flex-col 
w-screen
bg-white shadow-raised rounded-xl 
md:grid md:gap-6 
sm:max-w-screen-2xl sm:w-full
md:grid-cols-9`;
const LeftColumn = tw.div`
sm:col-span-4 md:col-span-3
flex flex-col 
p-4 ml-1 lg:p-8 `;
const RightColumn = tw.div`col-span-6 p-6 `;
const Title = tw.text`self-center md:self-auto text-xl p-2 sm:p-0 md:text-lg lg:text-2xl font-semibold`;
const Hint = tw.text`self-center md:self-auto text-sm p-1 flex flex-row gap-1 items-center text-gray-800`;
const CategoryCheckboxContainer = tw.div`flex flex-row align-middle items-center gap-1`;
const CategoryCheckboxLabel = tw.text` text-base`;
const CustomSkeleton = tw(Skeleton)`mt-5 min-w-full`;
const AccordionContainer = tw.div`ml-5 sm:self-center w-full md:self-start md:ml-0 xl:ml-5`;

/* End style components */

const LIMIT_PER_PAGE = 10;
const ALL_FILTER = -1; // Value used to represent the "select all"
const categoryFilterOptions = [ALL_FILTER, ...Object.values(CategoryEnum)];
const typeFilterOptions = Object.values(TransactionTypeEnum);
const sortModeOptions = Object.values(SortModeEnum);

function TransactionsPage({ loading }) {
  /* Start setup state */

  // Transactions state
  const selection = store.select((models) => ({
    transactions: models.BudgetModel.transactionsFromSelectedPeriod,
  }));
  const { transactions } = useSelector(selection); // Get transactions from selected period
  const transactionsWithoutPeriodFilter = useSelector(
    (state) => state.BudgetModel.transactions
  ); // For UX purposes
  const [localTransactions, setLocalTransactions] = React.useState(true); // Used to filter, sort, etc. locally

  // Filters state
  const [categoryFilterArray, setFilterCategoryArray] = React.useState([
    ALL_FILTER,
  ]);
  const [typeFilterArray, setTypeFilterArray] = React.useState(
    typeFilterOptions
  );
  const [sortModeArray, setSortModeArray] = React.useState([
    SortModeEnum.DATE_DESCENDING,
  ]);

  /* End setup state */

  // Filter and Sort
  React.useEffect(() => {
    let filteredAndSorted = transactions;

    // Filter
    filteredAndSorted = filteredAndSorted.filter((q) => {
      const typeCond = typeFilterArray.includes(q.type_id);
      const categoryCond =
        categoryFilterArray.includes(ALL_FILTER) ||
        categoryFilterArray.includes(q.category_id);

      return typeCond && categoryCond ? q : null;
    });

    // Sort
    // eslint-disable-next-line
    switch (sortModeArray[0]) {
      case SortModeEnum.DATE_DESCENDING:
        filteredAndSorted.sort((a, b) => b.date - a.date || b.id - a.id);
        break;
      case SortModeEnum.DATE_ASCENDING:
        filteredAndSorted.sort((a, b) => a.date - b.date || a.id - b.id);
        break;
      case SortModeEnum.AMOUNT_DESCENDING:
        filteredAndSorted.sort(
          (a, b) =>
            getTransactionAmountWithSign(b) - getTransactionAmountWithSign(a) ||
            b.id - a.id
        );
        break;
      case SortModeEnum.AMOUNT_ASCENDING:
        filteredAndSorted.sort(
          (a, b) =>
            getTransactionAmountWithSign(a) - getTransactionAmountWithSign(b) ||
            a.id - b.id
        );
        break;
    }

    setLocalTransactions(filteredAndSorted);
  }, [transactions, categoryFilterArray, typeFilterArray, sortModeArray]);

  // Triggered on Category checkbox click
  function handleFilterCategoryChange(
    valuesArray /* Array with values of categoryFilterOptions */
  ) {
    if (valuesArray.length === 0) {
      // No category check
      setFilterCategoryArray(valuesArray);
      return;
    }

    if (
      valuesArray.includes(ALL_FILTER) &&
      !categoryFilterArray.includes(ALL_FILTER)
    ) {
      // Uncheck every category except ALL_CATEGORIES if the user checked the all categories option
      setFilterCategoryArray([ALL_FILTER]);
    } else if (categoryFilterArray.includes(ALL_FILTER)) {
      // Uncheck ALL_CATEGORIES if it's already checked and the user checked a category
      setFilterCategoryArray(valuesArray.filter((q) => q !== ALL_FILTER));
    } else {
      // Remaining cases with ALL_CATEGORIES unchecked
      setFilterCategoryArray(valuesArray);
    }
  }

  // Triggered on Type checkbox click
  function handleTypeFilterChange(
    valuesArray /* Array with values of typeFilterOptions */
  ) {
    setTypeFilterArray(valuesArray);
  }

  // Triggered on Sort checkbox click
  function handleSortModeChange(
    valuesArray /* Array with values of sortModeOptions */
  ) {
    if (valuesArray.length > 1) {
      setSortModeArray([valuesArray[1]]);
    }
  }

  /* Start filter/sort components */

  const CategoryFilterComponent = (
    <CheckboxGroup
      name="categories"
      value={categoryFilterArray}
      onChange={handleFilterCategoryChange}
    >
      {(Checkbox) => (
        <>
          {categoryFilterOptions.map((v) => {
            return (
              <CategoryCheckboxContainer>
                <Checkbox
                  value={v}
                  style={{
                    transform: "scale(1.3)",
                  }}
                />
                <CategoryIcon category={v} small />
                <CategoryCheckboxLabel>
                  {v === ALL_FILTER ? "All categories" : getCategoryLabel(v)}
                </CategoryCheckboxLabel>
              </CategoryCheckboxContainer>
            );
          })}
        </>
      )}
    </CheckboxGroup>
  );

  const TypeFilterComponent = (
    <CheckboxGroup
      name="type"
      value={typeFilterArray}
      onChange={handleTypeFilterChange}
    >
      {(Checkbox) => (
        <>
          {typeFilterOptions.map((v) => {
            return (
              <CategoryCheckboxContainer>
                <Checkbox
                  value={v}
                  style={{
                    transform: "scale(1.3)",
                  }}
                />
                <CategoryCheckboxLabel style={{ marginLeft: 12 }}>
                  {getTransactionTypeLabel(v)}
                </CategoryCheckboxLabel>
              </CategoryCheckboxContainer>
            );
          })}
        </>
      )}
    </CheckboxGroup>
  );

  const SortModeComponent = (
    <CheckboxGroup
      name="type"
      value={sortModeArray}
      onChange={handleSortModeChange}
    >
      {(Checkbox) => (
        <>
          {sortModeOptions.map((v) => {
            return (
              <CategoryCheckboxContainer>
                <Checkbox
                  value={v}
                  style={{
                    transform: "scale(1.3)",
                  }}
                />
                <CategoryCheckboxLabel style={{ marginLeft: 12 }}>
                  {getSortModeLabel(v)}
                </CategoryCheckboxLabel>
              </CategoryCheckboxContainer>
            );
          })}
        </>
      )}
    </CheckboxGroup>
  );

  const RightColumnContent = () => {
    if (loading) return <CustomSkeleton count={10} height={25} width={100} />;

    if (localTransactions && localTransactions.length > 0)
      return (
        <>
          <TransactionList
            loading
            isPaginated
            limit={LIMIT_PER_PAGE}
            data={localTransactions}
          />
        </>
      );

    return <NoDataIndicator />;
  };

  /* End filter/sort components */
  return (
    <ContentWithPadding>
      <HeaderContainer>
        {/* Header (period selector) */}
        <DateRangeContainer>
          <DateRangeLabel>Period: </DateRangeLabel>
          <DateRangeSelector />
        </DateRangeContainer>
        {transactionsWithoutPeriodFilter.length > transactions.length && (
          <Hint>
            There are{" "}
            {bigNumberFormatter(
              transactionsWithoutPeriodFilter.length - transactions.length
            )}{" "}
            transactions excluded by the selected period
          </Hint>
        )}
      </HeaderContainer>
      <Container>
        <LeftColumn>
          {/* Left column */}
          <Title>
            Transactions
            {transactions &&
              !loading &&
              ` (${bigNumberFormatter(transactions.length)})`}
          </Title>
          <Hint>Click a transaction to edit or delete it</Hint>
          <AccordionContainer>
            {/* Filters/sort */}
            <Accordion
              isMulti
              items={[
                { title: "Sort", contentComponent: SortModeComponent },
                { title: "Type", contentComponent: TypeFilterComponent },
                {
                  title: "Category",
                  contentComponent: CategoryFilterComponent,
                },
              ]}
            />
          </AccordionContainer>
        </LeftColumn>
        <RightColumn>
          {/* Right column */}
          <RightColumnContent />
        </RightColumn>
      </Container>
    </ContentWithPadding>
  );
}

TransactionsPage.propTypes = {
  loading: PropTypes.bool.isRequired, // Injected by withFetchTransactions
};

export default withFetchTransactions(TransactionsPage);
