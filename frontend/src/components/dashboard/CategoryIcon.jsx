import * as Icons from "images/CategorySvg";
import tw, { styled } from "twin.macro";
import { EnumCategory } from "lib/Enums";
import { PropTypes } from "prop-types";

/* Start styled components */

/**
 * Get the associated tailwind background style for a category
 * @param  {String} enumCategory The category (must be a value of EnumCategory)
 * @return {TwFn}                Tailwind background style
 */
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

const CategoryImage = styled.div(({ category }) => [
  tw`rounded-full bg-contain bg-no-repeat bg-orange-500 bg-center h-12 w-12 mr-4`,
  getCategoryBackgroundStyle(category),
]);

/* End styled components */

function CategoryIcon({ category }) {
  let icon;

  // Get the associated SVG icon for the category
  switch (category) {
    case EnumCategory.SHOPPING:
      icon = Icons.SHOPPING;
      break;
    case EnumCategory.FOOD_DRINKS:
      icon = Icons.RESTAURANT;
      break;
    case EnumCategory.HOUSING:
      icon = Icons.HOUSE;
      break;
    case EnumCategory.COMMUNICATION_PC:
      icon = Icons.PC;
      break;
    case EnumCategory.FINANCIAL_EXPENSES:
      icon = Icons.CREDITCARD;
      break;
    case EnumCategory.INCOME:
      icon = Icons.CASH;
      break;
    case EnumCategory.INVESTMENTS:
      icon = Icons.DOLLAR;
      break;
    case EnumCategory.LIFE_ENTERTAINMENT:
      icon = Icons.USER;
      break;
    case EnumCategory.OTHERS:
      icon = Icons.DOTS;
      break;
    case EnumCategory.TRANSPORTATION:
      icon = Icons.TRUCK;
      break;
    case EnumCategory.VEHICLE:
      icon = Icons.CAR;
      break;
    default:
      icon = null;
  }

  return <CategoryImage category={category}>{icon}</CategoryImage>;
}

CategoryIcon.propTypes = {
  category: PropTypes.oneOf(Object.values(EnumCategory)).isRequired,
};

export default CategoryIcon;
