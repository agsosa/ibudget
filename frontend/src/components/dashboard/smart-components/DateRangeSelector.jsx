/*
  Smart component (Interacting with UserPrefsModel)

  PeriodEnum selector with dropdown and custom range.

  Usage:
    <DateRangeSelector/>
*/

import * as React from "react";
import { DateRange } from "react-date-range";
import subDays from "date-fns/subDays"; // eslint-disable-line
import tw, { styled } from "twin.macro";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import ReactSelect from "react-select";
import { PeriodEnum } from "lib/Enums";
import { getPeriodLabel } from "lib/Helpers";
import RadioGroup from "components/misc/input/RadioGroup";
import { useDispatch, useSelector } from "react-redux";
import store from "lib/Store";

/* Start styled components */

const SelectContainer = tw.div`justify-center align-middle`;
const DateComponent = styled(DateRange)(({ hidden }) => [
  tw`transform scale-x-90 sm:scale-x-100`,
  hidden && tw`hidden`,
]);
const Select = tw(ReactSelect)`w-56`;
const DropdownContent = styled.div(({ show }) => [
  tw`bg-white shadow-2xl flex flex-col z-20 absolute w-full left-0 sm:w-auto sm:left-auto sm:transform sm:translate-x-1/2 sm:right-1/2`,
  !show && tw`hidden`,
]);
const CloseBtn = tw(
  CloseIcon
)`absolute right-0 mt-3 mr-4 transform scale-90 cursor-pointer`;

/* End styled components */

const radioGroupOptions = [
  {
    value: PeriodEnum.SEVEN_DAYS,
    label: getPeriodLabel(PeriodEnum.SEVEN_DAYS),
  },
  {
    value: PeriodEnum.THIRTY_DAYS,
    label: getPeriodLabel(PeriodEnum.THIRTY_DAYS),
  },
  {
    value: PeriodEnum.NINETY_DAYS,
    label: getPeriodLabel(PeriodEnum.NINETY_DAYS),
  },
  {
    value: PeriodEnum.TWELVE_MONTHS,
    label: getPeriodLabel(PeriodEnum.TWELVE_MONTHS),
  },
  {
    value: PeriodEnum.CUSTOM,
    label: getPeriodLabel(PeriodEnum.CUSTOM),
  },
];

const DateRangeSelector = () => {
  const containterRef = React.useRef(null);
  const [isDropdownOpen, setDropdownOpen] = React.useState(false);

  const dispatch = useDispatch();
  const { selectedPeriod, fromDate, toDate } = useSelector(
    (state) => state.UserPrefsModel
  );

  const selection = store.select((models) => ({
    periodLabel: models.UserPrefsModel.formattedSelectedPeriod,
  }));
  const { periodLabel } = useSelector(selection);

  const [dateRange, setDateRange] = React.useState([
    {
      startDate: fromDate || new Date(),
      endDate: toDate || subDays(new Date(), 30),
      key: "selection",
    },
  ]);

  function handleRadioSelect(value) {
    if (value !== PeriodEnum.CUSTOM) {
      setDropdownOpen(false);
    }

    // Update our stored selected period
    dispatch({
      type: "UserPrefsModel/setSelectedPeriod",
      payload: {
        selectedPeriod: value,
        fromDate: dateRange[0].startDate,
        toDate: dateRange[0].endDate,
      },
    });
  }

  // Called when a range or date is selected on the date range picker component
  function handleDatePickerSelect(item) {
    setDateRange([item.selection]); // Update state used by the picker component

    // Update our stored fromDate and toDate
    dispatch({
      type: "UserPrefsModel/setSelectedPeriod",
      payload: {
        selectedPeriod,
        fromDate: item.selection.startDate,
        toDate: item.selection.endDate,
      },
    });
  }

  /* Start dropdown component */

  function toggleDropdown() {
    setDropdownOpen(!isDropdownOpen);
  }

  // Close dropdown on click outside
  function handleClickOutside(event) {
    if (
      isDropdownOpen &&
      containterRef.current &&
      !containterRef.current.contains(event.target)
    ) {
      toggleDropdown();
    }
  }

  // Register click event to close the dropdown on click outside
  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]); // Add isDropdownOpen as dependency to re-register listener on state update

  // Dropdown component (hidden if isDropdownOpen is false)
  function Dropdown() {
    return (
      <DropdownContent show={isDropdownOpen}>
        <CloseBtn onClick={toggleDropdown} />
        <RadioGroup
          onValueChange={handleRadioSelect}
          value={selectedPeriod}
          options={radioGroupOptions}
        />

        <DateComponent
          hidden={selectedPeriod !== PeriodEnum.CUSTOM}
          editableDateInputs
          onChange={handleDatePickerSelect}
          moveRangeOnFirstSelection={false}
          ranges={dateRange}
        />
      </DropdownContent>
    );
  }

  /* End dropdown component */

  return (
    <SelectContainer ref={containterRef}>
      <Select
        isSearchable={false}
        onMenuOpen={toggleDropdown}
        placeholder={periodLabel}
        components={{
          Menu: () => null,
        }}
      />
      <Dropdown />
    </SelectContainer>
  );
};

export default DateRangeSelector;
