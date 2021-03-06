/* 
  Simple form to edit or create a TransactionModel

  props:
    onInfoChange: callback that will be called with a TransactionInfo object (function(transactionInfo), optional)
    loading: boolean to indicate loading status (bool, optional, default false)
    editMode: boolean to indicate edit mode (used to disable transaction type modification) (bool, optional, default false)
    initialInfo: object of TransactionInfo (bool, optional, default null)
*/

import * as React from "react";
import tw, { styled } from "twin.macro";
import Icon from "@mdi/react";
import { mdiMinus, mdiPlus } from "@mdi/js";
import { TransactionTypeEnum, Limits, CategoryEnum } from "ibudget-shared";
import SelectButtonGroup from "components/misc/input/SelectButtonGroup";
import { Calendar } from "react-date-range";
import { es } from "react-date-range/dist/locale";
import CategorySelector from "components/dashboard/CategorySelector";
import { PropTypes } from "prop-types";
import { getTransactionTypeLabel } from "lib/Helpers";

/* Start styled components */

const InputContainer = tw.div`flex flex-col md:grid md:grid-cols-2 md:gap-12`;
const LeftContainer = tw.div`flex-col flex items-center gap-4 md:gap-3`;
const RightContainer = tw.div`flex-col flex items-center gap-4`;
const InputGroup = tw.div`flex flex-col items-center mb-3 w-full sm:w-80`;
const InputLabel = styled.text(({ missing }) => [
  tw`text-lg font-medium mb-2`,
  missing && tw`font-bold text-red-600`,
]);
const OptionalLabel = tw.text`text-sm font-light`;

const Input = tw.input`border-b-2 px-3 py-3 focus:outline-none transition duration-300 hocus:border-primary-500 w-full`;
const Textarea = styled(Input).attrs({ as: "textarea" })`
  ${tw`h-24`}
`;

const AmountInputContainer = tw.div`relative w-full`;

/* End styled components */

function TransactionInfoForm({ onInfoChange, initialInfo, loading, editMode }) {
  const initialTransactionInfo = {
    amount: null, // Number amount of money (required)
    notes: "", // String notes (optional)
    category_id: null, // Value of CategoryEnum (required)
    type_id: TransactionTypeEnum.IN, // Value of TransactionTypeEnum (required)
    date: null, // date  (required)
    concept: "", // String concept (optional)
  };

  const [transactionInfo, setTransactionInfo] = React.useState(
    initialInfo || initialTransactionInfo
  );

  const OptionalText = <OptionalLabel>Optional</OptionalLabel>;

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
        Category{transactionInfo.category_id == null && "*"}
      </InputLabel>
      <CategorySelector
        initialValue={transactionInfo.category_id}
        disabled={loading}
        onCategoryChange={onCategoryChange}
      />
    </InputGroup>
  );

  const TypeInput = (
    <InputGroup>
      <InputLabel missing={transactionInfo.type_id == null}>
        Transaction Type{transactionInfo.type_id == null && "*"}
      </InputLabel>
      <SelectButtonGroup
        disabled={loading || editMode}
        selectedValue={transactionInfo.type_id}
        onValueSelect={onTypeButtonClick}
      >
        <SelectButtonGroup.Item
          value={TransactionTypeEnum.IN}
          label={getTransactionTypeLabel(TransactionTypeEnum.IN)}
          borderRight
        />
        <SelectButtonGroup.Item
          value={TransactionTypeEnum.OUT}
          label={getTransactionTypeLabel(TransactionTypeEnum.OUT)}
          borderLeft
        />
      </SelectButtonGroup>
    </InputGroup>
  );

  const NoteInput = (
    <InputGroup>
      <InputLabel>Notes {OptionalText}</InputLabel>

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
      <InputLabel>Description {OptionalText}</InputLabel>
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
        Date{transactionInfo.date == null && "*"}
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
        Amount{transactionInfo.amount == null && "*"}
      </InputLabel>

      <AmountInputContainer>
        <Input
          disabled={loading}
          onChange={onInputChange}
          name="amount"
          type="number"
          placeholder="0"
          style={{
            paddingLeft: 35,
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
          style={{
            position: "absolute",
            left: "1.5%",
            top: "28%",
            opacity: 0.2,
          }}
          horizontal
          vertical
          rotate={180}
          color="black"
        />
      </AmountInputContainer>
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
  editMode: false,
};

TransactionInfoForm.propTypes = {
  onInfoChange: PropTypes.func,
  loading: PropTypes.bool,
  editMode: PropTypes.bool,
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
