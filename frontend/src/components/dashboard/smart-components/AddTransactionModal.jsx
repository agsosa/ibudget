/*
  Smart component (Interacting with BudgetModel)

  Component to create a new TransactionModel

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
import { NotificationTypeEnum, TransactionTypeEnum } from "lib/Enums";
import SelectButtonGroup from "components/misc/input/SelectButtonGroup";
import { TransactionModel } from "lib/Models";
import { Calendar } from "react-date-range";
import { enUS, es } from "react-date-range/dist/locale";
import CategorySelector from "components/dashboard/CategorySelector";
import CloudLoadingIndicator from "components/misc/CloudLoadingIndicator";
import LoadingOverlay from "components/layout/LoadingOverlay";
import Modal from "components/misc/Modal";
import { useDispatch } from "react-redux";
import { dispatchNotification } from "lib/Helpers";

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

function AddTransactionModal({ toggleModal }) {
  const dispatch = useDispatch();

  const initialState = {
    amount: null, // Number amount of money (required)
    notes: "", // String notes (optional)
    category: null, // Value of CategoryEnum (required)
    type: TransactionTypeEnum.OUT, // Value of TransactionTypeEnum (required)
    date: null, // date  (required)
    concept: "", // String concept (optional)
  };

  const [state, setState] = React.useState(initialState);
  const [loading, setLoading] = React.useState(false);

  const OptionalText = <OptionalLabel>Opcional</OptionalLabel>;

  /* Start event handlers */

  // Function called on Add transaction button click
  // Parameter closeModal: set to true to close the parent modal
  function onAddTransactionButtonClick(closeModal = false) {
    // TODO: Reject if the required input is not filled/invalid state
    setLoading(true);

    dispatch({
      type: "BudgetModel/createTransaction",
      payload: {
        transactionInfo: state,
        callback: (result) => {
          setLoading(false);
          if (!result.error && closeModal === true) toggleModal();
        },
      },
    });
  }

  // Function called on text box input fields
  function onInputChange(evt) {
    const fieldName = evt.target.name;
    const inputValue = evt.target.value;

    /* if (evt.target.type === "checkbox") {
      value = evt.target.checked;
    } */

    if (inputValue) {
      // Validate input

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
    if (Object.values(TransactionTypeEnum).includes(value)) {
      setState((oldState) => ({
        ...oldState,
        type: value,
      }));
    } else {
      console.error(
        "onTypeButtonClick received invalid value. Value should be any of TransactionTypeEnum."
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

  /* End event handlers */

  /* Start input components */

  const CategoryInput = (
    <InputGroup>
      <InputLabel>Categoría</InputLabel>
      <CategorySelector
        disabled={loading}
        onCategoryChange={onCategoryChange}
      />
    </InputGroup>
  );

  const TypeInput = (
    <InputGroup>
      <InputLabel>Tipo de Transacción</InputLabel>
      <SelectButtonGroup
        disabled={loading}
        selectedValue={state.type}
        onValueSelect={onTypeButtonClick}
      >
        <SelectButtonGroup.Item
          value={TransactionTypeEnum.OUT}
          label="Expense"
          borderLeft
        />
        <SelectButtonGroup.Item
          value={TransactionTypeEnum.IN}
          label="Income"
          borderRight
        />
      </SelectButtonGroup>
    </InputGroup>
  );

  const NoteInput = (
    <InputGroup>
      <InputLabel>Nota {OptionalText}</InputLabel>

      <Textarea
        name="notes"
        disabled={loading}
        value={state.notes}
        resizable={false}
        onChange={onInputChange}
        placeholder={`Write something (${TransactionModel.NOTES_MAX_CHARS} characters)`}
      />
    </InputGroup>
  );

  const ConceptInput = (
    <InputGroup>
      <InputLabel>Concepto {OptionalText}</InputLabel>
      <Input
        onChange={onInputChange}
        name="concept"
        disabled={loading}
        type="text"
        placeholder={`Write something (${TransactionModel.CONCEPT_MAX_CHARS} characters)`}
        value={state.concept}
      />
    </InputGroup>
  );

  const DateInput = (
    <InputGroup>
      <InputLabel>Fecha</InputLabel>
      <Calendar
        isDisabled={loading}
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
          disabled={loading}
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
          path={state.type === TransactionTypeEnum.OUT ? mdiMinus : mdiPlus}
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

  /* End subcomponents */

  return (
    <>
      <InputContainer>
        <LeftContainer>
          {TypeInput}
          {AmountInput}
          {CategoryInput}
          {NoteInput}
        </LeftContainer>
        <RightContainer>
          {ConceptInput} {DateInput}
        </RightContainer>
      </InputContainer>
      <ButtonsContainer>
        {loading ? (
          <CloudLoadingIndicator upload />
        ) : (
          <>
            <PrimaryButton
              disabled={loading}
              onClick={() => onAddTransactionButtonClick(true)}
            >
              Add Transaction
            </PrimaryButton>
            <SecondaryButton
              disabled={loading}
              onClick={onAddTransactionButtonClick}
            >
              Add and Create another
            </SecondaryButton>
          </>
        )}
      </ButtonsContainer>
    </>
  );
}

const withModalHoc = Modal(AddTransactionModal, "Add Transaction");
export default withModalHoc;
