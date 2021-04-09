/*
  Smart component

  Component (FORM) to submit a new transaction

  Usage:
    <AddTransaction />
*/

import tw from "twin.macro";
import styled from "styled-components";
import { Dropdown } from "react-bulma-components";

const SelectOption = tw.option`bg-white flex`;

const Select = styled.select`
  ${tw`w-full bg-white rounded-lg outline-none`}
`;
const Container = tw.div`bg-gray-300 flex justify-center align-middle flex flex-col md:grid md:grid-cols-2 align-middle`;
const LeftContainer = tw.div`pt-5 bg-red-200 flex-col flex justify-center items-center`;
const RightContainer = tw.div`pt-5 bg-blue-200 flex-col flex justify-center items-center`;
const CommonBottonStyle = tw.button`py-2 px-8 lg:px-20 font-semibold text-lg`;
const PrimaryButton = tw(CommonBottonStyle)`
rounded-xl 
bg-primary-500 
hover:bg-primary-700 transform hover:scale-105
hocus:outline-none text-white 
transition duration-200 ease-in-out`;
const SecondaryButton = tw(
  CommonBottonStyle
)`mt-2 text-blue-600 text-base underline`;
const InputItemContainer = tw.div`flex flex-col bg-red-500`;
const InputText = tw.text`text-base mb-1`;

function AddTransaction() {
  function CategoryDropdown() {
    return (
      <InputItemContainer>
        <InputText>Categoría:</InputText>
        <Dropdown label="asd">
          <Dropdown.Item value="item">Dropdown item</Dropdown.Item>
          <Dropdown.Item value="other">Other Dropdown item</Dropdown.Item>
          <Dropdown.Item value="active">Active Dropdown item</Dropdown.Item>
          <Dropdown.Item value="other 2">Other Dropdown item</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item value="divider">With divider</Dropdown.Item>
        </Dropdown>

        <Select>
          <SelectOption value="" hidden>
            Type
          </SelectOption>
          <SelectOption value="1">Audi</SelectOption>
          <SelectOption value="2">BMW</SelectOption>
          <SelectOption value="3">Citroen</SelectOption>
          <SelectOption value="4">Ford</SelectOption>
        </Select>
      </InputItemContainer>
    );
  }
  return (
    <Container>
      <LeftContainer>
        <CategoryDropdown />
      </LeftContainer>
      <RightContainer>
        <PrimaryButton>Add Transaction</PrimaryButton>
        <SecondaryButton>Add and Create another</SecondaryButton>
      </RightContainer>
    </Container>
  );
}

export default AddTransaction;
