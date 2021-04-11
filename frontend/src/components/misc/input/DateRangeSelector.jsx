// TODO: Fix range selection not working inside absolute containers

import * as React from "react";
import { DateRange } from "react-date-range";
import { subDays } from "date-fns"; // eslint-disable-line
import tw, { styled } from "twin.macro";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import ReactSelect from "react-select";
import { PeriodEnum } from "lib/Enums";
import { getPeriodLabel } from "lib/Helpers";
import RadioGroup from "components/misc/input/RadioGroup";

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

const defaultPeriod = PeriodEnum.THIRTY_DAYS;

export default () => {
  const containterRef = React.useRef(null);
  const [period, setPeriod] = React.useState(defaultPeriod);
  const [isDropdownOpen, setDropdownOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState([
    {
      startDate: new Date(),
      endDate: subDays(new Date(), 30),
      key: "selection",
    },
  ]);

  function handleRadioSelect(value) {
    if (value !== PeriodEnum.CUSTOM) setDropdownOpen(false);
    setPeriod(value);
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

  // Dropdown component
  function Dropdown() {
    return (
      <DropdownContent show={isDropdownOpen}>
        <CloseBtn onClick={toggleDropdown} />
        <RadioGroup
          onValueChange={handleRadioSelect}
          value={period}
          options={radioGroupOptions}
        />

        <DateComponent
          hidden={period !== PeriodEnum.CUSTOM}
          editableDateInputs
          onChange={(item) => setDateRange([item.selection])}
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
        placeholder={getPeriodLabel(period)}
        components={{
          Menu: () => null,
        }}
      />
      <Dropdown />
    </SelectContainer>
  );
};
