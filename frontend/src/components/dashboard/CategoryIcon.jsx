import * as Icons from "images/CategorySvg";
import tw, { styled } from "twin.macro";
import { EnumCategory } from "lib/Enums";
import { PropTypes } from "prop-types";

const CategoryImage = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded-full bg-contain bg-no-repeat bg-orange-500 bg-center h-12 w-12 mr-4`,
]);

function CategoryIcon({ category }) {
  let icon;

  switch (category) {
    case EnumCategory.SHOPPING:
      icon = Icons.SHOPPING;
      break;
    case EnumCategory.FOOD_DRINKS:
      icon = Icons.FOOD;
      break;
    default:
      icon = null;
  }

  return <CategoryImage>{icon}</CategoryImage>;
}

CategoryIcon.propTypes = {
  category: PropTypes.oneOf(Object.values(EnumCategory)).isRequired,
};

export default CategoryIcon;
