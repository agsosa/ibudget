/*
  RadioGroup
    Component to display and manage a list of Radio input elements (single check only)

    Props:
      onValueChange: callback to be called on any option check (function(value))
      options: list of options (array of { value: any, label: string })

    Example:
      options = [ { value: 5, label: "five"}, { value: 10, label "ten"}, ...]
      <RadioGroup value={state.value} onValueChange={handleValueChange} options={options} />
*/

import * as React from "react";
import tw from "twin.macro";
import { PeriodEnum } from "lib/Enums";
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

function RadioGroup({ onValueChange, options, value }) {
  return (
    <InputGroup>
      {Array.isArray(options) &&
        options.map((o) => {
          if (o.value != null) {
            return React.createElement(RadioItem, {
              value: o.value,
              label: o.label,
              checked: value === o.value,
              onChangeCB: () => {
                if (onValueChange) onValueChange(o.value);
              },
            });
          }

          console.warn(
            "RadioGroup: All elements of the option array should include a value property"
          );
          return null;
        })}
    </InputGroup>
  );
}

RadioItem.defaultProps = {
  label: "",
  checked: false,
  onChangeCB: null,
};

RadioItem.propTypes = {
  value: PropTypes.oneOf(Object.values(PeriodEnum)).isRequired,
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChangeCB: PropTypes.func,
};

RadioGroup.defaultProps = {
  onValueChange: null,
};

RadioGroup.propTypes = {
  onValueChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired, // eslint-disable-line
      label: PropTypes.string,
    })
  ).isRequired,
  value: PropTypes.any, // eslint-disable-line
};

export default RadioGroup;
