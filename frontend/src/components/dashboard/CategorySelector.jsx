/* 
  Dropdown for EnumCategory

  <CategorySelector onCategorySelect={callback} />

  props:
    onCategorySelect: callback(enumCategory) called on value change
*/

import * as React from "react";
import { PropTypes } from "prop-types";
import ReactSelect from "react-select";
import { EnumCategory } from "lib/Enums";
import { getCategoryLabel } from "lib/Helpers";
import tw, { styled } from "twin.macro";
import CategoryIcon from "components/dashboard/CategoryIcon";

/* Start styled components */

const Select = tw(ReactSelect)`w-full`;
const CategoryContainer = styled.div(({ small }) => [
  tw`flex flex-row items-center`,
  small && tw`absolute justify-center w-full`,
]);

/* End styled components */

// Component to render the selector value and option labels
const CategoryOption = ({ value, small }) => (
  <CategoryContainer small={small}>
    <CategoryIcon category={value} small={small} />
    {getCategoryLabel(value)}
  </CategoryContainer>
);

CategoryOption.defaultProps = {
  small: false,
};

CategoryOption.propTypes = {
  value: PropTypes.any.isRequired, // eslint-disable-line
  small: PropTypes.bool,
};

// Component to render the selector value
const SingleValue = ({ getValue }) => (
  <CategoryOption value={getValue()[0].value} small />
);

SingleValue.propTypes = {
  getValue: PropTypes.func.isRequired,
};

// Exported component
function CategorySelector({ onCategorySelect }) {
  const [value, setValue] = React.useState(null);

  function onCategoryChange(item) {
    setValue(item);
    if (onCategorySelect) onCategorySelect(item);
  }

  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      placeholder="Select..."
      value={value}
      components={{ SingleValue }}
      isClearable
      onChange={onCategoryChange}
      isSearchable={false}
      formatOptionLabel={CategoryOption}
      options={Object.values(EnumCategory).map((v) => ({ value: v }))}
      name="category"
    />
  );
}

CategorySelector.defaultProps = {
  onCategorySelect: null,
};

CategorySelector.propTypes = {
  onCategorySelect: PropTypes.func,
};

export default CategorySelector;
