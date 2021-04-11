/* 
  Component to display a category icon with a rounded colored background

  Usage:
    <CategoryIcon category={...} />

  Props:
    - category: Value of CategoryEnum (required)
    - small: boolean to indicate if the icon should be 50% smaller (optional)
*/

import tw, { styled } from "twin.macro";
import { CategoryEnum } from "lib/Enums";
import { PropTypes } from "prop-types";
import Icon from "@mdi/react";
import {
  getCategoryMaterialIcon,
  getCategoryBackgroundStyle,
} from "lib/Helpers";

const CategoryImage = styled.div(({ category, small }) => [
  tw`rounded-full bg-contain bg-no-repeat bg-orange-500 bg-center h-12 w-12 mr-4 flex justify-center align-middle`,
  getCategoryBackgroundStyle(category),
  small && tw`transform scale-50`,
]);

function CategoryIcon({ category, small }) {
  const icon = getCategoryMaterialIcon(category);

  return (
    <CategoryImage category={category} small={small}>
      <Icon
        path={icon}
        title="Category"
        size={1.5}
        style={{ marginTop: 5 }}
        horizontal
        vertical
        rotate={180}
        color="white"
      />
    </CategoryImage>
  );
}

CategoryIcon.defaultProps = {
  small: false,
};

CategoryIcon.propTypes = {
  category: PropTypes.oneOf(Object.values(CategoryEnum)).isRequired,
  small: PropTypes.bool,
};

export default CategoryIcon;
