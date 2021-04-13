import * as React from "react";
import tw, { styled } from "twin.macro";
import {
  Control,
  Input,
  Textarea,
} from "react-bulma-components/lib/components/form";
import Icon from "@mdi/react";
import { mdiMinus, mdiPlus } from "@mdi/js";
import { TransactionTypeEnum, Limits, CategoryEnum } from "ibudget-shared";
import SelectButtonGroup from "components/misc/input/SelectButtonGroup";
import { Calendar } from "react-date-range";
import { es } from "react-date-range/dist/locale";
import CategorySelector from "components/dashboard/CategorySelector";
import { PropTypes } from "prop-types";

/* Start styled components */

const InputContainer = tw.div`flex flex-col md:grid md:grid-cols-2 md:gap-12`;
const LeftContainer = tw.div`flex-col flex items-center gap-4 md:gap-2`;
const RightContainer = tw.div`flex-col flex items-center gap-4`;
const InputGroup = tw.div`flex flex-col items-center mb-3 w-full sm:w-80`;
const InputLabel = styled.text(({ missing }) => [
  tw`text-lg font-medium mb-2`,
  missing && tw`font-bold text-red-600`,
]);
const OptionalLabel = tw.text`text-sm font-light`;

/* End styled components */

function TransactionInfoForm({ onInfoChange, initialInfo, loading }) {
  const initialTransactionInfo = {
    amount: null, // Number amount of money (required)
    notes: "", // String notes (optional)
    category_id: null, // Value of CategoryEnum (required)
    type_id: TransactionTypeEnum.OUT, // Value of TransactionTypeEnum (required)
    date: null, // date  (required)
    concept: "", // String concept (optional)
  };

  const [transactionInfo, setTransactionInfo] = React.useState(
    initialInfo || initialTransactionInfo
  );

  const OptionalText = <OptionalLabel>Opcional</OptionalLabel>;

  React.useEffect(() => {
    if (onInfoChange) onInfoChange(transactionInfo);
  }, [transactionInfo]);

  /* Start event handlers */

  // Function called on text box input fields
  function onInputChange(evt) {
    const fieldName = evt.target.name; // The input name
    const inputValue = evt.target.value; // The input value

    /* if (evt.target.type === "checkbox") {
      value = evt.target.checked;
    } */

    // Validate input
    if (inputValue) {
      let parsedInput; // Used to parse fields if needed
      let validInput;

      switch (fieldName) {
        case "amount":
          parsedInput = parseFloat(inputValue);

          validInput =
            !Number.isNaN(parsedInput) &&
            parsedInput.countDecimals() <= Limits.AMOUNT_MAX_DECIMALS &&
            parsedInput >= Limits.AMOUNT_MIN_NUMBER &&
            parsedInput <= Limits.AMOUNT_MAX_NUMBER;

          break;
        case "notes":
          validInput = inputValue.length < Limits.NOTES_MAX_CHARS;
          break;
        case "concept":
          validInput = inputValue.length < Limits.CONCEPT_MAX_CHARS;
          break;
        default:
          validInput = false;
          break;
      }

      if (validInput) {
        setTransactionInfo((oldState) => ({
          ...oldState,
          [fieldName]: parsedInput || inputValue,
        }));
      }
    } else {
      // Reset field if we don't get a inputValue
      setTransactionInfo((oldState) => ({
        ...oldState,
        [fieldName]: initialTransactionInfo[fieldName],
      }));
    }
  }

  // Function called on Type button click
  function onTypeButtonClick(value) {
    if (Object.values(TransactionTypeEnum).includes(value)) {
      setTransactionInfo((oldState) => ({
        ...oldState,
        type_id: value,
      }));
    } else {
      console.error(
        "onTypeButtonClick received invalid value. Value should be any of TransactionTypeEnum."
      );
    }
  }

  // Function called on calendar date select
  function onCalendarChange(item) {
    setTransactionInfo((oldState) => ({
      ...oldState,
      date: item,
    }));
  }

  // Function called on category select
  function onCategoryChange(item) {
    console.log(item);
    setTransactionInfo((oldState) => ({
      ...oldState,
      category_id: item,
    }));
  }

  /* End event handlers */

  /* Start input components */

  const CategoryInput = (
    <InputGroup>
      <InputLabel missing={transactionInfo.category_id == null}>
        Categoría{transactionInfo.category_id == null && "*"}
      </InputLabel>
      <CategorySelector
        disabled={loading}
        onCategoryChange={onCategoryChange}
      />
    </InputGroup>
  );

  const TypeInput = (
    <InputGroup>
      <InputLabel missing={transactionInfo.type_id == null}>
        Tipo de Transacción{transactionInfo.type_id == null && "*"}
      </InputLabel>
      <SelectButtonGroup
        disabled={loading}
        selectedValue={transactionInfo.type_id}
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
        value={transactionInfo.notes}
        resizable={false}
        onChange={onInputChange}
        placeholder={`Write something (${Limits.NOTES_MAX_CHARS} characters)`}
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
        placeholder={`Write something (${Limits.CONCEPT_MAX_CHARS} characters)`}
        value={transactionInfo.concept}
      />
    </InputGroup>
  );

  const DateInput = (
    <InputGroup>
      <InputLabel missing={transactionInfo.date == null}>
        Fecha{transactionInfo.date == null && "*"}
      </InputLabel>
      <Calendar
        maxDate={new Date()}
        isDisabled={loading}
        onChange={onCalendarChange}
        locale={es} // TODO: Automatically get calendar locale
        date={transactionInfo.date}
      />
    </InputGroup>
  );

  const AmountInput = (
    <InputGroup>
      <InputLabel missing={transactionInfo.amount == null}>
        Monto{transactionInfo.amount == null && "*"}
      </InputLabel>

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
          min={Limits.AMOUNT_MIN_NUMBER}
          max={Limits.AMOUNT_MAX_NUMBER}
          value={transactionInfo.amount}
        />
        <Icon
          path={
            transactionInfo.type_id === TransactionTypeEnum.OUT
              ? mdiMinus
              : mdiPlus
          }
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
  );
}

TransactionInfoForm.defaultProps = {
  onInfoChange: null,
  loading: false,
  initialInfo: null,
};

TransactionInfoForm.propTypes = {
  onInfoChange: PropTypes.func,
  loading: PropTypes.bool,
  initialInfo: PropTypes.shape({
    amount: PropTypes.number,
    type_id: PropTypes.oneOf(Object.values(TransactionTypeEnum)),
    category_id: PropTypes.oneOf(Object.values(CategoryEnum)),
    notes: PropTypes.string,
    concept: PropTypes.string,
    date: PropTypes.object,
  }),
};

export default TransactionInfoForm;
