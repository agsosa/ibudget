/*
  RadioGroup
    Component to display and manage a list of Radio input elements

    Props:
      selectedValue: current selected value, it will check any child RadioGroup.Item with this value (any)
      onValueChange: callback to be called on any child RadioGroup.Item check (function(value))

  RadioGroup.Item
    Radio input element
    
    Props:
      value: the value to store (any)
      label: the string to display next to the radio (string)
      checked: condition to check/uncheck the radio (bool)
      onChangeCB: callback to be called on check (function(value))

    Usage:
        <RadioGroup onValueChange={handleRadioSelect} selectedValue={period}>
          <RadioGroup.Item
            value={EnumPeriod.SevenDays}
            label={getPeriodLabel(EnumPeriod.SevenDays)}
          />
          <RadioGroup.Item
            value={EnumPeriod.ThirtyDays}
            label={getPeriodLabel(EnumPeriod.ThirtyDays)}
          />
          ... etc
        </RadioGroup>
*/

import * as React from "react";
import tw from "twin.macro";
import { EnumPeriod } from "lib/Enums";
import { PropTypes } from "prop-types";

const Input = tw.input`m-1`;
const InputGroup = tw.div`p-5 ml-3 sm:ml-0`;
const InputContainer = tw.div`flex flex-row align-middle my-1`;
const InputText = tw.text`ml-1 text-sm`;

function RadioItem({ value, label, checked, onChangeCB }) {
  return (
    <InputContainer>
      <Input
        onClick={(e) => e.stopPropagation()}
        type="radio"
        value={value}
        checked={checked}
        onChange={() => {
          if (onChangeCB) onChangeCB(value);
        }}
      />
      <InputText>{label}</InputText>
    </InputContainer>
  );
}

function RadioGroup({ onValueChange, children, selectedValue }) {
  const childrenArray = React.Children.map(children, (child) => {
    if (child) {
      return React.cloneElement(
        child,
        child.type === RadioItem
          ? {
              checked: child.props.value === selectedValue,
              onChangeCB: onValueChange,
            }
          : {}
      );
    }
    return null;
  });

  return <InputGroup>{childrenArray}</InputGroup>;
}

RadioGroup.Item = RadioItem;

RadioItem.defaultProps = {
  label: "",
  checked: false,
  onChangeCB: null,
};

RadioItem.propTypes = {
  value: PropTypes.oneOf(Object.values(EnumPeriod)).isRequired,
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChangeCB: PropTypes.func,
};

RadioGroup.defaultProps = {
  children: null,
  onValueChange: null,
};

RadioGroup.propTypes = {
  children: PropTypes.node,
  onValueChange: PropTypes.func,
  selectedValue: PropTypes.any.isRequired, // eslint-disable-line
};

export default RadioGroup;
