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
  Checkbox,
  Radio,
  Help,
  InputFile,
} from "react-bulma-components/lib/components/form";
import Button from "react-bulma-components/lib/components/button";
import Icon from "@mdi/react";
import { mdiMinus, mdiPlus } from "@mdi/js";
import { EnumTransactionType } from "lib/Enums";
import SelectButtonGroup from "components/misc/input/SelectButtonGroup";
import { TransactionModel } from "lib/Models";
import { Calendar } from "react-date-range";
import { enUS, es } from "react-date-range/dist/locale";
import CategorySelector from "components/dashboard/CategorySelector";

/* Start styled components */

const InputContainer = tw.div`flex flex-col md:grid md:grid-cols-2 md:gap-12`;
const LeftContainer = tw.div`flex-col flex items-center gap-4 md:gap-2`;
const RightContainer = tw.div`flex-col flex items-center gap-4`;

const CommonBottonStyle = tw.button`py-2 px-8 lg:px-20 font-semibold text-lg focus:outline-none`;
const PrimaryButton = tw(CommonBottonStyle)`
rounded-xl mt-3
bg-primary-500 
hover:bg-primary-700 transform hover:scale-105 text-white 
transition-all duration-200 ease-in-out`;
const SecondaryButton = tw(
  CommonBottonStyle
)`mt-2 text-blue-600 text-base hover:text-primary-500 hover:underline`;
const ButtonsContainer = tw.div`w-full justify-center items-center flex flex-col mt-4`;

const InputGroup = tw.div`flex flex-col items-center mb-3 w-full sm:w-80`;
const InputLabel = tw.text`text-lg font-semibold mb-2`;
const OptionalLabel = tw.text`text-sm font-light`;

/* End styled components */

const initialState = {
  amount: null, // Number amount of money (required)
  notes: "", // String notes (optional)
  category: null, // Value of EnumCategory (required)
  type: EnumTransactionType.OUT, // Value of EnumTransactionType (required)
  date: null, // date  (required)
  concept: "", // String concept (optional)
};

const OptionalText = <OptionalLabel>Opcional</OptionalLabel>;

function AddTransaction() {
  const [state, setState] = React.useState(initialState);

  // Function called on text box input fields
  function onInputChange(evt) {
    const fieldName = evt.target.name;
    const inputValue = evt.target.value;

    /* if (evt.target.type === "checkbox") {
      value = evt.target.checked;
    } */

    // Validate and parse input fields
    if (inputValue) {
      let parsedInput; // Used to parse fields if needed
      let validInput = false;

      switch (fieldName) {
        case "amount":
          parsedInput = parseFloat(inputValue);

          validInput =
            !Number.isNaN(parsedInput) &&
            parsedInput.countDecimals() <=
              TransactionModel.AMOUNT_MAX_DECIMALS &&
            parsedInput >= TransactionModel.AMOUNT_MIN_NUMBER &&
            parsedInput <= TransactionModel.AMOUNT_MAX_NUMBER;

          break;
        case "notes":
          validInput = inputValue.length < TransactionModel.NOTES_MAX_CHARS;
          break;
        case "concept":
          validInput = inputValue.length < TransactionModel.CONCEPT_MAX_CHARS;
          break;
      }

      if (validInput) {
        setState((oldState) => ({
          ...oldState,
          [fieldName]: parsedInput || inputValue,
        }));
      }
    } else {
      // Reset field if we don't get a inputValue
      setState((oldState) => ({
        ...oldState,
        [fieldName]: initialState[fieldName],
      }));
    }
  }

  // Function called on Type button click
  function onTypeButtonClick(value) {
    if (Object.values(EnumTransactionType).includes(value)) {
      setState((oldState) => ({
        ...oldState,
        type: value,
      }));
    } else {
      console.error(
        "onTypeButtonClick received invalid value. Value should be any of EnumTransactionType."
      );
    }
  }

  // Function called on calendar date select
  function onCalendarChange(item) {
    setState((oldState) => ({
      ...oldState,
      date: item,
    }));
  }

  // Function called on category select
  function onCategoryChange(item) {
    setState((oldState) => ({
      ...oldState,
      category: item,
    }));
  }

  const CategoryDropdown = (
    <InputGroup>
      <InputLabel>Categoría</InputLabel>
      <CategorySelector onCategoryChange={onCategoryChange} />
    </InputGroup>
  );

  const TypeSelect = (
    <InputGroup>
      <InputLabel>Tipo de Transacción</InputLabel>
      <SelectButtonGroup
        selectedValue={state.type}
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

  const NoteTextbox = (
    <InputGroup>
      <InputLabel>Nota {OptionalText}</InputLabel>

      <Textarea
        name="notes"
        value={state.notes}
        resizable={false}
        onChange={onInputChange}
        placeholder={`Write something (${TransactionModel.NOTES_MAX_CHARS} characters)`}
      />
    </InputGroup>
  );

  const ConceptSelect = (
    <InputGroup>
      <InputLabel>Concepto {OptionalText}</InputLabel>
      <Input
        onChange={onInputChange}
        name="concept"
        type="text"
        placeholder={`Write something (${TransactionModel.CONCEPT_MAX_CHARS} characters)`}
        value={state.concept}
      />
    </InputGroup>
  );

  const DateSelect = (
    <InputGroup>
      <InputLabel>Fecha</InputLabel>
      <Calendar
        onChange={onCalendarChange}
        locale={es} // TODO: Automatically get calendar locale
        date={state.date}
      />
    </InputGroup>
  );

  const AmountInput = (
    <InputGroup>
      <InputLabel>Monto</InputLabel>

      <Control>
        <Input
          onChange={onInputChange}
          name="amount"
          type="number"
          placeholder="0"
          style={{
            paddingLeft: 32,
          }}
          min={TransactionModel.AMOUNT_MIN_NUMBER}
          max={TransactionModel.AMOUNT_MAX_NUMBER}
          value={state.amount}
        />
        <Icon
          path={state.type === EnumTransactionType.OUT ? mdiMinus : mdiPlus}
          title="Money amount"
          size={0.9}
          style={{ position: "absolute", left: 5, top: "25%", opacity: 0.2 }}
          horizontal
          vertical
          rotate={180}
          color="black"
        />
      </Control>
    </InputGroup>
  );

  return (
    <>
      <InputContainer>
        <LeftContainer>
          {TypeSelect}
          {AmountInput}
          {CategoryDropdown}
          {NoteTextbox}
        </LeftContainer>
        <RightContainer>
          {ConceptSelect} {DateSelect}
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
