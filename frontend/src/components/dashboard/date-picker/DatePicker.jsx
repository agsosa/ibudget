import * as React from "react";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns"; // eslint-disable-line
import tw from "twin.macro";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";

const Container = tw.div``;
const DateComponent = tw(DateRange)`transform scale-x-90 sm:scale-x-100`;
const Select = tw.select`rounded-lg w-56 border border-gray-300 p-1 align-middle disabled:bg-white hover:bg-primary-100 cursor-pointer`;
const DropdownContent = tw.div`bg-white shadow-2xl flex flex-col z-20 absolute left-0 w-full sm:w-auto sm:left-auto`;
const Input = tw.input`m-1`;
const InputGroup = tw.div`p-5 ml-3 sm:ml-0`;
const InputContainer = tw.div`flex flex-row align-middle my-1`;
const InputText = tw.text`ml-1 text-sm`;
const CloseBtn = tw(
  CloseIcon
)`absolute right-0 mt-3 mr-4 transform scale-90 cursor-pointer`;

export default () => {
  const [state, setState] = React.useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  function CustomSelect() {
    return (
      <>
        <Select disabled>
          <option hidden selected>
            Select placeholder
          </option>
        </Select>
        <DropdownContent>
          <CloseBtn />
          <InputGroup>
            <InputContainer>
              <Input type="radio" />
              <InputText>7 days</InputText>
            </InputContainer>
            <InputContainer>
              <Input type="radio" />
              <InputText>30 days</InputText>
            </InputContainer>
            <InputContainer>
              <Input type="radio" />
              <InputText>90 days</InputText>
            </InputContainer>
            <InputContainer>
              <Input type="radio" />
              <InputText>12 months</InputText>
            </InputContainer>
            <InputContainer>
              <Input type="radio" />
              <InputText>Custom range</InputText>
            </InputContainer>
          </InputGroup>
          <DateComponent
            editableDateInputs
            onChange={(item) => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={state}
          />
        </DropdownContent>
      </>
    );
  }

  return (
    <Container>
      <CustomSelect />
    </Container>
  );
};
