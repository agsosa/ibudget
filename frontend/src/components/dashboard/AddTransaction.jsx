/*
  Smart component

  Component (FORM) to create a new TransactionModel

  Usage:
    <AddTransaction />
*/

/* eslint-disable */
import * as React from "react";
import tw, { styled } from "twin.macro";
import {
  Field,
  Control,
  Label,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Help,
  InputFile,
} from "react-bulma-components/lib/components/form";
import Button from "react-bulma-components/lib/components/button";
import Icon from "react-bulma-components/lib/components/icon";
import { EnumTransactionType } from "lib/Enums";
import SelectButtonGroup from "components/misc/SelectButtonGroup";

/* Start styled components */

const InputContainer = tw.div`flex flex-col md:grid md:grid-cols-2 `;
const LeftContainer = tw.div`flex-col flex justify-center items-center md:px-8`;
const RightContainer = tw.div`flex-col flex justify-center items-center md:px-8`;

const CommonBottonStyle = tw.button`py-2 px-8 lg:px-20 font-semibold text-lg focus:outline-none`;
const PrimaryButton = tw(CommonBottonStyle)`
rounded-xl 
bg-primary-500 
hover:bg-primary-700 transform hover:scale-105 text-white 
transition duration-200 ease-in-out`;
const SecondaryButton = tw(
  CommonBottonStyle
)`mt-2 text-blue-600 text-base hover:text-primary-500 hover:underline`;
const ButtonsContainer = tw.div`w-full justify-center items-center flex flex-col mt-8 `;

const InputGroup = tw.div`flex flex-col items-center mb-3`;
const InputLabel = tw.text`text-base mb-2`;

/* End styled components */

const initialState = {
  amount: null, // Number amount of money (required)
  notes: null, // String notes (optional)
  category: null, // Value of EnumCategory (required)
  type: EnumTransactionType.OUT, // Value of EnumTransactionType (required)
  date: null, // date  (required)
  concept: null, // String concept (optional)
};

function AddTransaction() {
  const [state, setState] = React.useState(initialState);

  const { amount, notes, category, type, date, concept } = state;

  function onInputChange(evt) {
    const value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setState({
      [evt.target.name]: value,
    });
  }

  function onTypeButtonClick(value) {
    if (Object.values(EnumTransactionType).includes(value)) {
      setState({ ...state, type: value });
    } else {
      console.error(
        "onTypeButtonClick received invalid value. Value should be any of EnumTransactionType."
      );
    }
  }

  function CategoryDropdown() {
    return (
      <InputGroup>
        <InputLabel>Categoría</InputLabel>
      </InputGroup>
    );
  }

  function TypeSelect() {
    return (
      <InputGroup>
        <InputLabel>Tipo de Transacción</InputLabel>
        <SelectButtonGroup
          selectedValue={type}
          onValueSelect={onTypeButtonClick}
        >
          <SelectButtonGroup.Item
            value={EnumTransactionType.OUT}
            label="Expense"
            borderLeft
          />
          <SelectButtonGroup.Item
            value={EnumTransactionType.IN}
            label="Income"
            borderRight
          />
        </SelectButtonGroup>
      </InputGroup>
    );
  }

  function ConceptSelect() {
    return (
      <InputGroup>
        <InputLabel>Concepto</InputLabel>
      </InputGroup>
    );
  }

  function NoteTextbox() {
    return (
      <InputGroup>
        <InputLabel>Notas</InputLabel>

        <Textarea
          name="notes"
          value={notes}
          onChange={onInputChange}
          placeholder="Additional notes..."
        />
      </InputGroup>
    );
  }

  function DateSelect() {
    return (
      <InputGroup>
        <InputLabel>Concepto</InputLabel>
      </InputGroup>
    );
  }

  function AmountInput() {
    return (
      <InputGroup>
        <InputLabel>Monto</InputLabel>
      </InputGroup>
    );
  }

  return (
    <>
      <InputContainer>
        <LeftContainer>
          <TypeSelect />
          <CategoryDropdown />
          <NoteTextbox />
        </LeftContainer>
        <RightContainer>
          <ConceptSelect />
          <DateSelect />
          <AmountInput />
        </RightContainer>
      </InputContainer>
      <ButtonsContainer>
        <PrimaryButton>Add Transaction</PrimaryButton>
        <SecondaryButton>Add and Create another</SecondaryButton>
      </ButtonsContainer>
    </>
  );
}

export default AddTransaction;
