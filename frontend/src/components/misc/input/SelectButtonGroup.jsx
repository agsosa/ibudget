/*
  SelectButtonGroup
    Component to display and manage a group of selectable buttons (single selection)

    Props:
      selectedValue: current selected value, it will select any child SelectButtonGroup.Item with this value (required)(any)
      onValueSelect: callback to be called on any child SelectButtonGroup.Item click (function(value))

  SelectButtonGroup.Item
    Individual item
    
    Props:
      value: the value to store (required)(any)
      label: the string to display next to the radio (optional)(string)
      rounded: apply rounded style (optional)(bool)
      roundedLeft: apply left rounded style (optional)(bool)
      roundedRight: apply right rounded style (optional)(bool)

      isSelected: condition to check/uncheck the radio (bool) (managed by SelectButtonGroup)
      onClickCB: callback to be called on check (function(value)) (managed by SelectButtonGroup's onValueSelect)

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
import tw, { styled } from "twin.macro";
import { EnumPeriod } from "lib/Enums";
import { PropTypes } from "prop-types";

const Container = tw.div`flex flex-row`;
const SelectButton = styled.button(
  ({ isSelected, roundedLeft, roundedRight, rounded }) => [
    tw`bg-primary-200 hocus:outline-none px-6 py-1 transform hover:scale-110 hover:z-50 transition duration-200 ease-in-out`,
    isSelected && tw`bg-primary-500 text-white font-semibold`,
    roundedLeft && tw`rounded-l-lg`,
    roundedRight && tw`rounded-r-lg`,
    rounded && tw`rounded-lg`,
  ]
);

function SelectButtonItem({
  value,
  label,
  isSelected,
  roundedLeft,
  roundedRight,
  rounded,
  onClickCB,
}) {
  return (
    <SelectButton
      isSelected={isSelected}
      roundedLeft={roundedLeft}
      roundedRight={roundedRight}
      rounded={rounded}
      value={value}
      onClick={() => {
        if (onClickCB) onClickCB(value);
      }}
    >
      {label}
    </SelectButton>
  );
}

function SelectButtonGroup({ onValueSelect, children, selectedValue }) {
  const childrenArray = React.Children.map(children, (child) => {
    if (child) {
      return React.cloneElement(
        child,
        child.type === SelectButtonItem
          ? {
              isSelected: child.props.value === selectedValue,
              onClickCB: onValueSelect,
            }
          : {}
      );
    }
    return null;
  });

  return <Container>{childrenArray}</Container>;
}

SelectButtonGroup.Item = SelectButtonItem;

SelectButtonItem.defaultProps = {
  label: "",
  isSelected: false,
  onClickCB: null,
  roundedLeft: false,
  roundedRight: false,
  rounded: false,
};

SelectButtonItem.propTypes = {
  value: PropTypes.oneOf(Object.values(EnumPeriod)).isRequired,
  label: PropTypes.string,
  isSelected: PropTypes.bool,
  roundedLeft: PropTypes.bool,
  roundedRight: PropTypes.bool,
  rounded: PropTypes.bool,
  onClickCB: PropTypes.func,
};

SelectButtonGroup.defaultProps = {
  children: null,
  onValueSelect: null,
};

SelectButtonGroup.propTypes = {
  children: PropTypes.node,
  onValueSelect: PropTypes.func,
  selectedValue: PropTypes.any.isRequired, // eslint-disable-line
};

export default SelectButtonGroup;
