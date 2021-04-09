import * as React from "react";
import { DateRange } from "react-date-range";
import { subDays } from "date-fns"; // eslint-disable-line
import tw, { styled } from "twin.macro";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import ReactSelect from "react-select";
import { EnumPeriod } from "lib/Enums";
import { PropTypes } from "prop-types";

const Container = tw.div`justify-center align-middle`;
const DateComponent = tw(DateRange)`transform scale-x-90 sm:scale-x-100`;
const Select = tw(ReactSelect)`w-56`;
const DropdownContent = styled.div(({ show }) => [
  tw`bg-white shadow-2xl flex flex-col z-20 absolute w-full left-0 sm:w-auto sm:left-auto`,
  !show && tw`hidden`,
]);
const Input = tw.input`m-1`;
const InputGroup = tw.div`p-5 ml-3 sm:ml-0`;
const InputContainer = tw.div`flex flex-row align-middle my-1`;
const InputText = tw.text`ml-1 text-sm`;
const CloseBtn = tw(
  CloseIcon
)`absolute right-0 mt-3 mr-4 transform scale-90 cursor-pointer`;

export default () => {
  const containterRef = React.useRef(null);
  const [period, setPeriod] = React.useState(EnumPeriod.ThirtyDays);
  const [isDropdownOpen, setDropdownOpen] = React.useState(false);
  const [state, setState] = React.useState([
    {
      startDate: new Date(),
      endDate: subDays(new Date(), 30),
      key: "selection",
    },
  ]);

  /* Start radio component */
  function handleRadioSelect(event) {
    const enumPeriod = parseInt(event.target.value, 10);
    if (enumPeriod !== EnumPeriod.Custom) setDropdownOpen(false);
    setPeriod(enumPeriod);
  }

  // Radio component
  function Radio({ value, label }) {
    return (
      <InputContainer>
        <Input
          onClick={(e) => e.stopPropagation()}
          type="radio"
          value={value}
          checked={period === value}
          onChange={handleRadioSelect}
        />
        <InputText>{label}</InputText>
      </InputContainer>
    );
  }

  Radio.propTypes = {
    value: PropTypes.oneOf(Object.values(EnumPeriod)).isRequired,
    label: PropTypes.string.isRequired,
  };
  /* End radio component */

  /* Start dropdown component */
  function toggleDropdown() {
    setDropdownOpen(!isDropdownOpen);
  }

  // Close dropdown on click outside
  function handleClickOutside(event) {
    console.log(event.target);
    console.log(!containterRef.current.contains(event.target), isDropdownOpen);
    if (
      isDropdownOpen &&
      containterRef.current &&
      !containterRef.current.contains(event.target)
    ) {
      toggleDropdown();
    }
  }

  // Register click even
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
        <InputGroup>
          <Radio value={EnumPeriod.SevenDays} label="7 days" />
          <Radio value={EnumPeriod.ThirtyDays} label="30 days" />
          <Radio value={EnumPeriod.NinetyDays} label="90 days" />
          <Radio value={EnumPeriod.TwelveMonths} label="12 months" />
          <Radio value={EnumPeriod.Custom} label="Custom range" />
        </InputGroup>

        <DateComponent
          editableDateInputs
          onChange={(item) => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
      </DropdownContent>
    );
  }
  /* End dropdown component */

  return (
    <Container ref={containterRef}>
      <Select
        isSearchable={false}
        onMenuOpen={toggleDropdown}
        placeholder="xd"
        components={{
          Menu: () => null,
        }}
      />
      <Dropdown />
    </Container>
  );
};
