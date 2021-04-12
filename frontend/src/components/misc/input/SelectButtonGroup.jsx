/*
  SelectButtonGroup
    Component to display and manage a group of selectable buttons (single selection)

    Props:
      selectedValue: current selected value, it will select any child SelectButtonGroup.Item with this value (required)(any)
      onValueSelect: callback to be called on any child SelectButtonGroup.Item click (function(value))
      disabled: boolean to indicate disabled status (optional)(bool)

  SelectButtonGroup.Item
    Individual item
    
    Props:
      value: the value to store (required)(any)
      label: the string to display next to the radio (optional)(string)
      rounded: apply rounded style (optional)(bool)
      roundedLeft: apply left rounded style (optional)(bool)
      roundedRight: apply right rounded style (optional)(bool)
      disabled: boolean to indicate disabled status (optional)(bool)

      isSelected: condition to check/uncheck the radio (bool) (managed by SelectButtonGroup)
      onClickCB: callback to be called on check (function(value)) (managed by SelectButtonGroup's onValueSelect)

    Usage:
        <SelectButtonGroup onValueChange={handleSelectValueChange} selectedValue={value}>
          <SelectButtonGroup.Item
            value={EnumPeriod.SevenDays}
            label={getPeriodLabel(EnumPeriod.SevenDays)}
            roudedLeft
          />
          <SelectButtonGroup.Item
            value={EnumPeriod.ThirtyDays}
            label={getPeriodLabel(EnumPeriod.ThirtyDays)}
            rounded
          />
          ... etc
        </SelectButtonGroup>
*/

import * as React from "react";
import tw, { styled } from "twin.macro";
import { PeriodEnum } from "lib/Enums";
import { PropTypes } from "prop-types";

const Container = tw.div`flex flex-row`;
const SelectButton = styled.button(
  ({ isSelected, roundedLeft, roundedRight, rounded, disabled }) => [
    tw`bg-primary-200 hocus:outline-none px-6 py-1 transform hover:scale-110 hover:z-50 transition duration-200 ease-in-out`,
    isSelected && tw`bg-primary-500 text-white font-semibold`,
    roundedLeft && tw`rounded-l-lg`,
    roundedRight && tw`rounded-r-lg`,
    rounded && tw`rounded-lg`,
    disabled && tw`bg-gray-500 hover:scale-100 text-gray-800`,
  ]
);

function SelectButtonItem({
  value,
  label,
  isSelected,
  roundedLeft,
  roundedRight,
  disabled,
  rounded,
  onClickCB,
}) {
  return (
    <SelectButton
      disabled={disabled}
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

function SelectButtonGroup({
  onValueSelect,
  children,
  selectedValue,
  disabled,
}) {
  const childrenArray = React.Children.map(children, (child) => {
    if (child) {
      return React.cloneElement(
        child,
        child.type === SelectButtonItem
          ? {
              isSelected: child.props.value === selectedValue,
              onClickCB: onValueSelect,
              disabled,
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
  disabled: false,
};

SelectButtonItem.propTypes = {
  value: PropTypes.oneOf(Object.values(PeriodEnum)).isRequired,
  label: PropTypes.string,
  isSelected: PropTypes.bool,
  roundedLeft: PropTypes.bool,
  roundedRight: PropTypes.bool,
  rounded: PropTypes.bool,
  onClickCB: PropTypes.func,
  disabled: PropTypes.bool,
};

SelectButtonGroup.defaultProps = {
  children: null,
  onValueSelect: null,
  disabled: false,
};

SelectButtonGroup.propTypes = {
  children: PropTypes.node,
  onValueSelect: PropTypes.func,
  selectedValue: PropTypes.any.isRequired, // eslint-disable-line
  disabled: PropTypes.bool,
};

export default SelectButtonGroup;
