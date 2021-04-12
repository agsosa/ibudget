/* 
  Dropdown for CategoryEnum

  <CategorySelector onCategorySelect={callback} />

  props:
    onCategorySelect: callback(CategoryEnum) called on value change
    disabled: boolean to indicate if the input is disabled
*/

import * as React from "react";
import { PropTypes } from "prop-types";
import ReactSelect from "react-select";
import { CategoryEnum } from "lib/Enums";
import { getCategoryLabel } from "lib/Helpers";
import tw, { styled } from "twin.macro";
import CategoryIcon from "components/dashboard/CategoryIcon";

/* Start styled components */

const Select = tw(ReactSelect)`w-full`;
const CategoryContainer = styled.div(({ small }) => [
  tw`flex flex-row items-center`,
  small && tw`absolute justify-center w-full`,
]);
const CategoryLabel = styled.div(({ small }) => [tw`ml-3`, small && tw`ml-0`]);
/* End styled components */

// Component to render the selector value and option labels
const CategoryOption = ({ value, small }) => (
  <CategoryContainer small={small}>
    <CategoryIcon category={value} small={small} />
    <CategoryLabel small={small}>{getCategoryLabel(value)}</CategoryLabel>
  </CategoryContainer>
);

CategoryOption.defaultProps = {
  small: false,
};

CategoryOption.propTypes = {
  value: PropTypes.any.isRequired, // eslint-disable-line
  small: PropTypes.bool,
};

// Component to render the selected selector value
const SingleValue = ({ getValue }) => (
  <CategoryOption value={getValue()[0].value} small />
);

SingleValue.propTypes = {
  getValue: PropTypes.func.isRequired,
};

// Exported component
function CategorySelector({ onCategorySelect, disabled }) {
  const [value, setValue] = React.useState(null);

  function onCategoryChange(item) {
    setValue(item);
    if (onCategorySelect) onCategorySelect(item);
  }

  return (
    <Select
      isDisabled={disabled}
      className="basic-single"
      classNamePrefix="select"
      placeholder="Select..."
      value={value}
      components={{ SingleValue }}
      isClearable
      onChange={onCategoryChange}
      isSearchable={false}
      formatOptionLabel={CategoryOption}
      options={Object.values(CategoryEnum).map((v) => ({ value: v }))}
      name="category"
    />
  );
}

CategorySelector.defaultProps = {
  onCategorySelect: null,
  disabled: false,
};

CategorySelector.propTypes = {
  onCategorySelect: PropTypes.func,
  disabled: PropTypes.bool,
};

export default CategorySelector;
