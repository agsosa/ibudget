/* 
  Component to display a category icon with a rounded colored background

  Usage:
    <CategoryIcon category={...} />

  Props:
    - category: Value of EnumCategory (required)
    - small: boolean to indicate if the icon should be 50% smaller (optional)
*/

import tw, { styled } from "twin.macro";
import { EnumCategory } from "lib/Enums";
import { PropTypes } from "prop-types";
import Icon from "@mdi/react";
import {
  mdiSilverware,
  mdiCartOutline,
  mdiHome,
  mdiBus,
  mdiCarHatchback,
  mdiDevices,
  mdiCurrencyUsd,
  mdiCreditCardOutline,
  mdiBriefcaseOutline,
  mdiAccount,
  mdiDotsVertical,
} from "@mdi/js";

/* Start styled components */

/**
 * Get the associated tailwind background style for a category
 * @param  {String} enumCategory The category (must be a value of EnumCategory)
 * @return {TwFn}                Tailwind background style
 */
// TODO: Move to Helper?
const getCategoryBackgroundStyle = (enumCategory) => {
  switch (enumCategory) {
    case EnumCategory.SHOPPING:
      return tw`bg-orange-500`;
    case EnumCategory.COMMUNICATION_PC:
      return tw`bg-orange-400`;
    case EnumCategory.FINANCIAL_EXPENSES:
      return tw`bg-red-600`;
    case EnumCategory.FOOD_DRINKS:
      return tw`bg-red-500`;
    case EnumCategory.HOUSING:
      return tw`bg-indigo-600`;
    case EnumCategory.INCOME:
      return tw`bg-yellow-400`;
    case EnumCategory.INVESTMENTS:
      return tw`bg-green-500`;
    case EnumCategory.LIFE_ENTERTAINMENT:
      return tw`bg-blue-500`;
    case EnumCategory.OTHERS:
      return tw`bg-gray-500`;
    case EnumCategory.TRANSPORTATION:
      return tw`bg-pink-500`;
    case EnumCategory.VEHICLE:
      return tw`bg-purple-500`;
    default:
      return tw`bg-gray-700`;
  }
};

// Get the associated material design icon for the category
// TODO: Move to helper?
const getCategoryMaterialIcon = (category) => {
  let icon;
  switch (category) {
    case EnumCategory.SHOPPING:
      icon = mdiCartOutline;
      break;
    case EnumCategory.FOOD_DRINKS:
      icon = mdiSilverware;
      break;
    case EnumCategory.HOUSING:
      icon = mdiHome;
      break;
    case EnumCategory.COMMUNICATION_PC:
      icon = mdiDevices;
      break;
    case EnumCategory.FINANCIAL_EXPENSES:
      icon = mdiCreditCardOutline;
      break;
    case EnumCategory.INCOME:
      icon = mdiCurrencyUsd;
      break;
    case EnumCategory.INVESTMENTS:
      icon = mdiBriefcaseOutline;
      break;
    case EnumCategory.LIFE_ENTERTAINMENT:
      icon = mdiAccount;
      break;
    case EnumCategory.OTHERS:
      icon = mdiDotsVertical;
      break;
    case EnumCategory.TRANSPORTATION:
      icon = mdiBus;
      break;
    case EnumCategory.VEHICLE:
      icon = mdiCarHatchback;
      break;
    default:
      icon = null;
  }

  return icon;
};

const CategoryImage = styled.div(({ category, small }) => [
  tw`rounded-full bg-contain bg-no-repeat bg-orange-500 bg-center h-12 w-12 mr-4 flex justify-center align-middle`,
  getCategoryBackgroundStyle(category),
  small && tw`transform scale-50`,
]);

/* End styled components */

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
  category: PropTypes.oneOf(Object.values(EnumCategory)).isRequired,
  small: PropTypes.bool,
};

export default CategoryIcon;
