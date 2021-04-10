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
import Icon from "@mdi/react";
import { mdiMinus, mdiPlus } from "@mdi/js";
import { EnumTransactionType } from "lib/Enums";
import SelectButtonGroup from "components/misc/SelectButtonGroup";
import { TransactionModel } from "lib/Models";

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

  function onInputChange(evt) {
    let value;

    // Parse/validate input
    if (evt.target.type === "checkbox") {
      value = evt.target.checked;
    } else if (evt.target.name === "amount") {
      const inputNumber = parseInt(evt.target.value, 10);
      if (
        inputNumber >= 0 &&
        inputNumber <= TransactionModel.AMOUNT_MAX_NUMBER
      ) {
        value = inputNumber;
      }
    } else value = evt.target.value;

    if (value) {
      setState((oldState) => ({
        ...oldState,
        [evt.target.name]: value,
      }));
    }
  }

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

  const CategoryDropdown = (
    <InputGroup>
      <InputLabel>Categoría</InputLabel>
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
      <InputLabel>Notas</InputLabel>

      <Textarea
        name="notes"
        value={state.notes}
        onChange={onInputChange}
        placeholder="Additional notes..."
      />
    </InputGroup>
  );

  const ConceptSelect = (
    <InputGroup>
      <InputLabel>Concepto</InputLabel>
    </InputGroup>
  );

  const DateSelect = (
    <InputGroup>
      <InputLabel>Concepto</InputLabel>
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
          min={0}
          max={TransactionModel.AMOUNT_MAX_NUMBER}
          format={(value) => "asd"}
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
          {CategoryDropdown}
          {NoteTextbox}
        </LeftContainer>
        <RightContainer>
          {ConceptSelect}
          {DateSelect}
          {AmountInput}
        </RightContainer>
      </InputContainer>
      <ButtonsContainer>
        <PrimaryButton>Add Transaction</PrimaryButton>
        <SecondaryButton>Add and Create another</SecondaryButton>

        {JSON.stringify(state)}
      </ButtonsContainer>
    </>
  );
}

export default AddTransaction;
