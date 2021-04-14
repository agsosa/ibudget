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
import Icon from "@mdi/react";
import { mdiInformationOutline } from "@mdi/js";
import { SortModeEnum } from "lib/Enums";

/* Start styled components */

const HeaderContainer = tw.div`w-full flex flex-col items-center mb-8 `;
const DateRangeContainer = tw.div`flex-col text-center flex sm:flex-row justify-center align-middle`;
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
const Hint = tw.text` text-sm p-1 mt-1 flex flex-row gap-1 items-center`;
const CategoryCheckboxContainer = tw.div`flex flex-row align-middle items-center gap-1`;
const CategoryCheckboxLabel = tw.text` text-base`;
const CustomSkeleton = tw(Skeleton)`mt-5 min-w-full`;

/* End style components */

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
    switch (sortModeArray[0]) {
      case SortModeEnum.DATE_DESCENDING:
        filteredAndSorted.sort((a, b) => b.date - a.date);
        break;
      case SortModeEnum.DATE_ASCENDING:
        filteredAndSorted.sort((a, b) => a.date - b.date);
        break;
      case SortModeEnum.AMOUNT_DESCENDING:
        filteredAndSorted.sort(
          (a, b) =>
            getTransactionAmountWithSign(b) - getTransactionAmountWithSign(a)
        );
        break;
      case SortModeEnum.AMOUNT_ASCENDING:
        filteredAndSorted.sort(
          (a, b) =>
            getTransactionAmountWithSign(a) - getTransactionAmountWithSign(b)
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
      setFilterCategoryArray(valuesArray);
    } else {
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
                  {v === ALL_FILTER
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
          <TransactionList loading limit={20} data={localTransactions} />
        </>
      );

    return <NoDataIndicator />;
  };

  /* End filter/sort components */
  return (
    <ContentWithPadding>
      <HeaderContainer>
        <DateRangeContainer>
          <DateRangeLabel>Period: </DateRangeLabel>
          <DateRangeSelector />
        </DateRangeContainer>
        {transactionsWithoutPeriodFilter.length > transactions.length && (
          <Hint>
            Hay{" "}
            {bigNumberFormatter(
              transactionsWithoutPeriodFilter.length - transactions.length
            )}{" "}
            transaccion(es) fuera del periodo seleccionado
          </Hint>
        )}
      </HeaderContainer>
      <Container>
        <LeftColumn>
          <Title>
            Transacciones
            {transactions &&
              !loading &&
              ` (${bigNumberFormatter(transactions.length)})`}
          </Title>
          <Hint>
            <Icon
              path={mdiInformationOutline}
              title="Hint"
              size={0.75}
              style={{ opacity: 0.5 }}
              color="black"
            />
            Click a transaction to edit or delete it
          </Hint>
          <Accordion
            isMulti
            items={[
              { title: "Orden", contentComponent: SortModeComponent },
              { title: "Tipo", contentComponent: TypeFilterComponent },
              {
                title: "Categoría",
                contentComponent: CategoryFilterComponent,
              },
            ]}
          />
        </LeftColumn>
        <RightColumn>
          <RightColumnContent />
        </RightColumn>
      </Container>
    </ContentWithPadding>
  );
}

export default withFetchTransactions(TransactionsPage);
