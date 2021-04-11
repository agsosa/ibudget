// TODO: Fix range selection not working inside absolute containers

import * as React from "react";
import { DateRange } from "react-date-range";
import { subDays } from "date-fns"; // eslint-disable-line
import tw, { styled } from "twin.macro";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import ReactSelect from "react-select";
import { EnumPeriod } from "lib/Enums";
import { getPeriodLabel } from "lib/Helpers";
import RadioGroup from "components/misc/input/RadioGroup";

/* Start styled components */

const SelectContainer = tw.div`justify-center align-middle`;
const DateComponent = tw(DateRange)`transform scale-x-90 sm:scale-x-100`;
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
    value: EnumPeriod.SevenDays,
    label: getPeriodLabel(EnumPeriod.SevenDays),
  },
  {
    value: EnumPeriod.ThirtyDays,
    label: getPeriodLabel(EnumPeriod.ThirtyDays),
  },
  {
    value: EnumPeriod.NinetyDays,
    label: getPeriodLabel(EnumPeriod.NinetyDays),
  },
  {
    value: EnumPeriod.TwelveMonths,
    label: getPeriodLabel(EnumPeriod.TwelveMonths),
  },
  {
    value: EnumPeriod.Custom,
    label: getPeriodLabel(EnumPeriod.Custom),
  },
];

const defaultPeriod = EnumPeriod.ThirtyDays;

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
    if (value !== EnumPeriod.Custom) setDropdownOpen(false);
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

  // Register click event
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
